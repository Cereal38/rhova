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
    description: t('metadata.create-quiz-description'),
  };
}

export default async function CreateQuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className='relative min-h-dvh flex flex-col'>
      <GradientBackground />
      <Topbar items={topbarItems} />;
      <div className='flex-1 flex flex-col pt-(--topbar-height) pb-4'>
        {children}
      </div>
    </div>
  );
}
