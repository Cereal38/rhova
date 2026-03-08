'use client';

import WsCallback from '@/models/ws-callback';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerWaitingRoom() {
  const router = useRouter();
  const { roomCode } = useParams();
  const { socket, isConnected } = useSocket();
  const [roomNotFound, setRoomNotFound] = useState(false);

  // Connect the player to the session
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit('join-session', roomCode, (res: WsCallback) => {
      if (!res.success) {
        console.error("Can't join this room: ", res.error);
        setRoomNotFound(true);
      }
    });
  }, [roomCode, socket, isConnected]);

  // When the host start the quiz, redirect the user to the question page
  useEffect(() => {
    if (!socket || !isConnected) return;

    const onShowQuestion = () => {
      router.push(routes.playerQuestion(roomCode as string));
    };

    socket.on('show-question', onShowQuestion);
    return () => {
      socket.off('show-question', onShowQuestion);
    };
  }, [socket, isConnected, roomCode, router]);

  if (roomNotFound) notFound();

  return (
    <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
      <object
        data='/room-code-bg.svg'
        type='image/svg+xml'
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <main className='flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
        <Card className='w-full max-w-sm p-10 flex flex-col items-center gap-6'>
          <div className='flex flex-col items-center gap-1'>
            <h1 className='font-bold text-3xl'>You&apos;re in!</h1>
            <p className='text-sm text-muted-foreground'>
              Room {roomCode}
            </p>
          </div>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Spinner className='size-4' />
            <p className='text-sm'>Waiting for the host to start...</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
