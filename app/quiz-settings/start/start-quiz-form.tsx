'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StartQuizForm() {
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  const [fileInput, setFileInput] = useState<File | null>(null);

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileInput(file);
    }
  };

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

    // Read the content of the file and extract the json config from it
    const text = await fileInput.text();
    const quizData = JSON.parse(text);

    socket.emit('create-session', quizData, (res: { roomCode: string }) => {
      console.log('Session created: ', res.roomCode);
      router.push(`/quiz/${res.roomCode}/host-waiting-room`);
    });
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
      </Field>
      <Button disabled={!fileInput} type='submit'>
        Start the quiz
      </Button>
    </form>
  );
}
