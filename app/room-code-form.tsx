'use client';

import { Field, FieldError } from '@/components/ui/field';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '../models/interfaces/ws-callback';
import { Spinner } from '@/components/ui/spinner';
import { routes } from '@/lib/routes';
import { EventName } from '@/models/enums/event-name';
import { useTranslations } from 'next-intl';

export default function RoomCodeForm() {
  const { socket, isConnected } = useSocket();
  const t = useTranslations();
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
    setError(undefined);
    const startTime = Date.now();

    if (!socket || !isConnected) {
      setError(t('home.error-connection'));
      setLoading(false);
      return;
    }

    socket.emit(EventName.CheckCode, roomCodeInput, (res: WsCallback) => {
      // Artificially slow the request to improve UX and avoid join spamming
      const minimumWaitingTime = 600;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumWaitingTime - elapsedTime);
      setTimeout(() => {
        setLoading(false);
        if (!res.success) {
          setError(res.error);
          return;
        }
        setError(undefined);

        // Naivgate to the waiting room
        router.push(routes.playerWaitingRoom(roomCodeInput));
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
          placeholder={t('home.room-code')}
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
            <Spinner /> {t('common.joining')}
          </>
        ) : (
          t('common.join')
        )}
      </Button>
      {error && <FieldError>{error}</FieldError>}
    </form>
  );
}
