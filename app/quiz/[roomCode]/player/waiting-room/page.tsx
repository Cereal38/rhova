'use client';

import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomLoader from '@/components/custom-spinner';
import GradientBackground from '@/components/gradient-background';
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
    <div className='relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden text-white'>
      <GradientBackground dark />
      <main className='flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-4 py-8'>
        <div className='w-full max-w-sm p-10 flex flex-col items-center gap-16'>
          <CustomLoader size={16} />
          <div className='flex flex-col items-center gap-1'>
            <h1 className='font-bold text-3xl'>
              {t('player-waiting-room.title')}
            </h1>
            <p className='text-center'>{t('player-waiting-room.waiting')}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
