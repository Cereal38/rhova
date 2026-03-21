import GradientBackground from '@/components/gradient-background';
import Topbar from '@/components/topbar';
import { routes } from '@/lib/routes';
import { TopbarItem } from '@/models/interfaces/topbar-item';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: React.ReactNode;
}

export default async function QuizHostQuestionLayout({ children }: Props) {
  const t = await getTranslations();

  const topbarItems: TopbarItem[] = [
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
      <div className='relative flex-1 pt-(--topbar-height)'>
        <GradientBackground />
        {children}
      </div>
    </>
  );
}
