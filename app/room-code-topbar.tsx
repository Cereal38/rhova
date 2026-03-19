import ClickableLogo from '@/components/clickable-logo';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { getTranslations } from 'next-intl/server';

export default async function RoomCodeTopbar() {
  const t = await getTranslations();

  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 py-4 w-full backdrop-blur-3xl border-b border-white/5'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button asChild variant='ghost' className='font-bold h-8'>
          <Link href={routes.start()} className='text-white'>
            {t('common.start-a-quiz')}
          </Link>
        </Button>
        <Button asChild className='font-bold h-8 ml-4'>
          <Link href={routes.quizSettingsCreate()}>
            {t('common.create-a-quiz')}
          </Link>
        </Button>
      </div>
    </header>
  );
}
