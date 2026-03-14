'use client';

import WsCallback from '@/models/interfaces/ws-callback';
import { Card } from '@/components/ui/card';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomSpinner from '@/components/custom-spinner';

export default function PlayerWaitingRoom() {
  const router = useRouter();
  const { roomCode } = useParams();
  const { socket, isConnected } = useSocket();

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

  return (
    <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
      <object
        data='/room-code-bg.svg'
        type='image/svg+xml'
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <main className='flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
        <Card className='w-full max-w-sm p-10 flex flex-col items-center gap-8'>
          <div className='flex flex-col items-center gap-1'>
            <h1 className='font-bold text-3xl'>You&apos;re in!</h1>
            <p className=''>Waiting for the host to start...</p>
          </div>
          <CustomSpinner size={16} />
        </Card>
      </main>
    </div>
  );
}
