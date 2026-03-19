import type { Metadata } from 'next';
import StartQuizTopbar from './start-quiz-topbar';
import { getTranslations } from 'next-intl/server';
import GradientBackground from '@/components/gradient-background';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Rhova',
    description: t('metadata.start-quiz-description'),
  };
}

export default function StartQuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative min-h-dvh flex flex-col'>
      <GradientBackground />
      <StartQuizTopbar />
      <div className='flex-1 flex flex-col'>{children}</div>
    </div>
  );
}
