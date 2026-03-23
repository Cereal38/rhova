import { Card } from '@/components/ui/card';
import PlayerCounter from './player-counter';
import RoomCodeSection from './room-code-section';
import QrCodeSection from './qr-code-section';
import StartQuizButton from './start-quiz-button';
import { getTranslations } from 'next-intl/server';
import GradientBackground from '@/components/gradient-background';
import { TopbarItem } from '@/models/interfaces/topbar-item';
import { routes } from '@/lib/routes';
import Topbar from '@/components/topbar';

export default async function HostWaitingRoomPage() {
  const t = await getTranslations();

  const topbarItems: TopbarItem[] = [
    {
      label: t('common.create-a-quiz'),
      href: routes.create(),
      variant: 'ghost',
    },
    {
      label: t('common.start-a-quiz'),
      href: routes.start(),
      variant: 'ghost',
    },
    {
      label: t('common.join'),
      href: routes.home(),
    },
  ];
  return (
    <>
      <Topbar items={topbarItems} />
      <div className='flex-1 relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
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
    </>
  );
}
