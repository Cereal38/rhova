'use client';

import { Field } from '@/components/ui/field';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function RoomCodeForm() {
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/quiz/${roomCodeInput}/join`);
  };

  return (
    <form onSubmit={handleJoinRoom} className='flex flex-col gap-4'>
      <Field>
        <Input
          type='text'
          inputMode='text'
          autoCapitalize='characters'
          autoCorrect='off'
          spellCheck={false}
          maxLength={6}
          placeholder='Enter room code'
          className='h-16 text-center font-mono tracking-[0.25em] uppercase'
          value={roomCodeInput}
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, '');
            setRoomCodeInput(e.currentTarget.value);
          }}
        />
      </Field>
      <Button
        type='submit'
        className='w-full text-xl h-16 uppercasep cursor-pointer'
      >
        Enter
      </Button>
    </form>
  );
}
