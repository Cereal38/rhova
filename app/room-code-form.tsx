'use client';

import { Field, FieldError } from '@/components/ui/field';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from './models/ws-callback';
import { Spinner } from '@/components/ui/spinner';

export default function RoomCodeForm() {
  const { socket, isConnected } = useSocket();
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRoomCodeInputChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const newValue: string = e.currentTarget.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');

    setRoomCodeInput(newValue);
    setError(undefined);
  };

  const handleJoinRoom = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);
    const startTime = Date.now();
    await new Promise((r) => setTimeout(r, 1000));

    if (!socket || !isConnected) {
      setError('Error connecting to the server');
      setLoading(false);
      return;
    }

    socket.emit('check-code', roomCodeInput, (res: WsCallback) => {
      // Artificially slow the request to improve UX and avoid join spamming
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 400 - elapsedTime);
      setTimeout(() => {
        setLoading(false);
        if (!res.success) {
          setError(res.error);
          return;
        }
        setError(undefined);
        router.push(`/quiz/${roomCodeInput}/join`);
      }, remainingTime);
    });
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
          aria-invalid={!!error}
          value={roomCodeInput}
          onChange={handleRoomCodeInputChange}
        />
      </Field>
      <Button
        disabled={loading || roomCodeInput.length !== 6}
        type='submit'
        className='w-full text-xl h-16 uppercasep cursor-pointer'
      >
        {loading ? (
          <>
            <Spinner /> Joining...
          </>
        ) : (
          'Enter'
        )}
      </Button>
      {error && <FieldError>{error}</FieldError>}
    </form>
  );
}
