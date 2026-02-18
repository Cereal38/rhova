'use client';

import { Card } from '@/components/ui/card';
import { useSocket } from '@/hooks/use-socket';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function JoinPage() {
  const { roomCode } = useParams();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    handleJoinRoom();
  }, [roomCode, socket, isConnected]);

  const handleJoinRoom = () => {
    console.log(`Trying to join room with code ${roomCode}...`);

    if (!socket || !isConnected) {
      console.log('Joining room failed');
      return;
    }

    socket.emit(
      'join-session',
      roomCode,
      (res: { success: boolean; error?: string }) => {
        console.log('Join success: ', res.success);
      },
    );
  };

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
