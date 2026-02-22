'use client';

import WsCallback from '@/models/ws-callback';
import { Card } from '@/components/ui/card';
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
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden font-sans'>
      <object
        data='/room-code-bg.svg'
        type='image/svg+xml'
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
        <Card className='p-8 flex flex-col items-center gap-2'>
          <p className='font-bold text-xl md:text-8xl'>You are in!</p>
          <p className='opacity-75'>Waiting for the host to start the quiz</p>
        </Card>
      </main>
    </div>
  );
}
