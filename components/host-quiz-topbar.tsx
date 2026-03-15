'use client';

import ClickableLogo from '@/components/clickable-logo';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HostQuizTopbar() {
  const t = useTranslations();

  return (
    <header className='z-30 flex items-center justify-between gap-8 p-4 w-full backdrop-brightness-250 shadow-xs'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button asChild variant='ghost' className='font-bold h-8'>
          <Link href={routes.quizSettingsStart()}>{t('common.start-a-quiz')}</Link>
        </Button>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href={routes.quizSettingsCreate()}>{t('common.create-a-quiz')}</Link>
        </Button>
        <Button className='font-bold ml-4 h-8'>
          <Link href={routes.home()}>{t('common.join')}</Link>
        </Button>
      </div>
    </header>
  );
}
