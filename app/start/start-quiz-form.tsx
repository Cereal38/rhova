'use client';

import Quiz from '@/models/interfaces/quiz';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { quizFormatValidator } from '@/validators/quiz-format-validator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Spinner } from '@/components/ui/spinner';
import { EventName } from '@/models/enums/event-name';
import { useTranslations } from 'next-intl';

export default function StartQuizForm() {
  const { socket, isConnected } = useSocket();
  const router = useRouter();
  const t = useTranslations();

  const [fileInput, setFileInput] = useState<File>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileInput(file);
    }
  };

  // TODO: Improve the code of this function
  const startQuizHandler = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoading(true);

    if (!fileInput) {
      console.error('No file selected');
      setLoading(false);
      return;
    }

    if (!socket || !isConnected) {
      console.error('No socket or connection.');
      setLoading(false);
      return;
    }

    let text: string;
    try {
      text = await fileInput.text();
    } catch (err) {
      handleError(t('start-quiz.error-read-file'));
      setLoading(false);
      console.error(
        'An error occurred while reading the given file. Error: ' + err,
      );
      return;
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(text);
    } catch (err) {
      handleError(t('start-quiz.error-invalid-config'));
      setLoading(false);
      console.error(
        'An error occurred while parsing the given file. Error: ' + err,
      );
      return;
    }

    const quizFormatValidation = quizFormatValidator.safeParse(parsedData);
    if (!quizFormatValidation.success) {
      handleError(t('start-quiz.error-invalid-config'));
      setLoading(false);
      return;
    }

    const quizData: Quiz = quizFormatValidation.data;

    let hostToken: string | null = localStorage.getItem('hostToken');
    if (!hostToken) {
      hostToken = uuidv4();
      localStorage.setItem('hostToken', hostToken);
    }

    socket.emit(
      EventName.CreateSession,
      quizData,
      hostToken,
      (res: { roomCode: string }) => {
        console.log('Session created: ', res.roomCode);
        router.push(routes.hostWaitingRoom(res.roomCode));
      },
    );
  };

  const handleError = (message: string) => {
    setError(message);
    setFileInput(undefined);
  };

  return (
    <form
      aria-labelledby='start-quiz-title'
      className='flex flex-col gap-4'
      onSubmit={startQuizHandler}
    >
      <Field className='pt-4'>
        <FieldLabel htmlFor='quiz'>{t('start-quiz.file-label')}</FieldLabel>
        <FieldDescription>
          {t.rich('start-quiz.file-description', {
            link: (chunks) => (
              <Link href={routes.quizSettingsCreate()}>{chunks}</Link>
            ),
          })}
        </FieldDescription>
        <Input id='quiz' type='file' onChange={fileInputChangeHandler} />
        {error && <FieldError>{error}</FieldError>}
      </Field>
      <Button
        disabled={!fileInput || loading}
        type='submit'
        className='cursor-pointer'
      >
        {loading && <Spinner />}
        {t('common.start-the-quiz')}
      </Button>
    </form>
  );
}
