'use client';

import { Card } from '@/components/ui/card';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomLoader from '@/components/custom-spinner';
import { EventName } from '@/models/enums/event-name';
import { useTranslations } from 'next-intl';

export default function PlayerWaitingRoom() {
  const router = useRouter();
  const { roomCode } = useParams();
  const { socket, isConnected } = useSocket();
  const t = useTranslations();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const onShowQuestion = () => {
      router.push(routes.playerQuestion(roomCode as string));
    };

    socket.on(EventName.ShowQuestion, onShowQuestion);
    return () => {
      socket.off(EventName.ShowQuestion, onShowQuestion);
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
            <h1 className='font-bold text-3xl'>{t('player-waiting-room.title')}</h1>
            <p className='text-center'>{t('player-waiting-room.waiting')}</p>
          </div>
          <CustomLoader size={16} />
        </Card>
      </main>
    </div>
  );
}
