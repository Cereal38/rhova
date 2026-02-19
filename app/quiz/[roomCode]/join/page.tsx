'use client';

import WsCallback from '@/app/models/ws-callback';
import { Card } from '@/components/ui/card';
import { useSocket } from '@/hooks/use-socket';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JoinPage() {
  const { roomCode } = useParams();
  const { socket, isConnected } = useSocket();
  const [roomNotFound, setRoomNotFound] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit('join-session', roomCode, (res: WsCallback) => {
      if (!res.success) {
        console.error("Can't join this room: ", res.error);
        setRoomNotFound(true);
      }
    });
  }, [roomCode, socket, isConnected]);

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
