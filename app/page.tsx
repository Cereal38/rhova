import { Card } from '@/components/ui/card';
import RoomCodeForm from './room-code-form';
import GradientBackground from '@/components/gradient-background';
import { getTranslations } from 'next-intl/server';
import { TopbarItem } from '@/models/interfaces/topbar-item';
import { routes } from '@/lib/routes';
import Topbar from '@/components/topbar';

export default async function RoomCodePage() {
  const t = await getTranslations();

  const topbarItems: TopbarItem[] = [
    {
      label: t('common.start-a-quiz'),
      href: routes.start(),
    },
  ];

  return (
    <>
      <Topbar items={topbarItems} />
      <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
        <GradientBackground />
        <main className='flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
          <Card className='flex flex-col gap-8 p-8 md:min-w-[400px]'>
            <h1 className='font-bold text-center text-6xl md:text-7xl'>
              Rhova
            </h1>
            <RoomCodeForm />
          </Card>
        </main>
      </div>
    </>
  );
}
