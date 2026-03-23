import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import GradientBackground from '@/components/gradient-background';
import { TopbarItem } from '@/models/interfaces/topbar-item';
import { routes } from '@/lib/routes';
import Topbar from '@/components/topbar';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Rhova',
    description: t('metadata.start-quiz-description'),
  };
}

export default async function StartQuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations();

  const topbarItems: TopbarItem[] = [
    {
      label: t('common.join'),
      href: routes.home(),
    },
  ];

  return (
    <div className='relative min-h-dvh flex flex-col'>
      <GradientBackground />
      <Topbar items={topbarItems} />;
      <div className='flex-1 flex flex-col'>{children}</div>
    </div>
  );
}
