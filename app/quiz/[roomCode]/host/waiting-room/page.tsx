import { Card } from '@/components/ui/card';
import PlayerCounter from './player-counter';
import RoomCodeSection from './room-code-section';
import QrCodeSection from './qr-code-section';
import StartQuizButton from './start-quiz-button';
import { getTranslations } from 'next-intl/server';
import GradientBackground from '@/components/gradient-background';

export default async function HostWaitingRoomPage() {
  const t = await getTranslations();

  return (
    <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
      <GradientBackground />
      <main className='flex min-h-dvh w-full flex-col items-center justify-center gap-8 px-4'>
        <Card className='p-8 flex flex-col items-center gap-16'>
          <div className=' flex flex-col items-center'>
            <h1 className='text-3xl'>Rhova.io</h1>
            <PlayerCounter />
          </div>
          <div className='grid grid-cols-[1fr_10px_1fr]'>
            <QrCodeSection />

            <div className='flex flex-col items-center gap-4'>
              <div className='flex-1 w-[2px] bg-black'></div>
              <span>{t('common.or')}</span>
              <div className='flex-1 w-[2px] bg-black'></div>
            </div>

            <RoomCodeSection />
          </div>
          <StartQuizButton />
        </Card>
      </main>
    </div>
  );
}
