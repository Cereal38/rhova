'use client';

import Quiz from '@/app/models/quiz';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';
import { quizFormatValidator } from '@/validators/quiz-format-validator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StartQuizForm() {
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  const [fileInput, setFileInput] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    if (!fileInput) {
      console.error('No file selected');
      return;
    }

    if (!socket || !isConnected) {
      console.error('No socket or connection.');
      return;
    }

    // Read the content of the file and extract the raw content from it
    let text: string;
    try {
      text = await fileInput.text();
    } catch (err) {
      handleError('Failed to read the file');
      return;
    }

    // Parse the content of the file to obtain a valid json object
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(text);
    } catch (err) {
      handleError('Invalid quiz config. Did you selected a .rhova file?');
      return;
    }

    // Validate if the format of the json is a correct Quiz object
    const quizFormatValidation = quizFormatValidator.safeParse(parsedData);
    if (!quizFormatValidation.success) {
      handleError('Invalid quiz config. Did you selected a .rhova file?');
      return;
    }

    const quizData: Quiz = quizFormatValidation.data;

    socket.emit('create-session', quizData, (res: { roomCode: string }) => {
      console.log('Session created: ', res.roomCode);
      router.push(`/quiz/${res.roomCode}/host-waiting-room`);
    });
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
      <Button disabled={!fileInput} type='submit'>
        Start the quiz
      </Button>
    </form>
  );
}
