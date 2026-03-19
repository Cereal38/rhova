import ClickableLogo from '@/components/clickable-logo';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function QuizSettingsTopbar() {
  const t = await getTranslations();

  return (
    <header className='z-30 flex items-center justify-between gap-8 px-4 py-4 w-full backdrop-blur-3xl border-b border-white/5'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button variant='ghost' className='font-bold h-8 text-white'>
          <Link href={routes.start()}>{t('common.start-a-quiz')}</Link>
        </Button>
        <Button variant='ghost' className='font-bold h-8 text-white'>
          <Link href={routes.quizSettingsCreate()}>
            {t('common.create-a-quiz')}
          </Link>
        </Button>
        <Button className='font-bold ml-4 h-8'>
          <Link href={routes.home()}>{t('common.join')}</Link>
        </Button>
      </div>
    </header>
  );
}
