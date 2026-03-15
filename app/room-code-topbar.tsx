import ClickableLogo from '@/components/clickable-logo';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { getTranslations } from 'next-intl/server';

export default async function RoomCodeTopbar() {
  const t = await getTranslations();

  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 h-12 w-full bg-white'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button asChild variant='ghost' className='font-bold h-8'>
          <Link href={routes.quizSettingsStart()}>{t('common.start-a-quiz')}</Link>
        </Button>
        <Button asChild className='font-bold h-8 ml-4'>
          <Link href={routes.quizSettingsCreate()}>{t('common.create-a-quiz')}</Link>
        </Button>
      </div>
    </header>
  );
}
