'use client';

import Quiz from '@/models/quiz';
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

export default function StartQuizForm() {
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  const [fileInput, setFileInput] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
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

    // Read the content of the file and extract the raw content from it
    let text: string;
    try {
      text = await fileInput.text();
    } catch (err) {
      handleError('Failed to read the file');
      setLoading(false);
      return;
    }

    // Parse the content of the file to obtain a valid json object
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(text);
    } catch (err) {
      handleError('Invalid quiz config. Did you selected a .rhova file?');
      setLoading(false);
      return;
    }

    // Validate if the format of the json is a correct Quiz object
    const quizFormatValidation = quizFormatValidator.safeParse(parsedData);
    if (!quizFormatValidation.success) {
      handleError('Invalid quiz config. Did you selected a .rhova file?');
      setLoading(false);
      return;
    }

    const quizData: Quiz = quizFormatValidation.data;

    // Check if the host has a token stored in the localstorage, else create one and store it
    let hostToken: string | null = localStorage.getItem('hostToken');
    if (!hostToken) {
      hostToken = uuidv4();
      localStorage.setItem('hostToken', hostToken);
    }

    socket.emit(
      'create-session',
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
    setFileInput(null);
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={startQuizHandler}>
      <Field className='pt-4'>
        <FieldLabel htmlFor='quiz'>File</FieldLabel>
        <FieldDescription>
          To start a quiz, select a .rhova file from your system. If you don't
          have one, you can create one from the "
          <Link href='/quiz-settings/create'>create a quiz</Link>" page
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
        Start the quiz
      </Button>
    </form>
  );
}
