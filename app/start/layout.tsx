import type { Metadata } from 'next';
import QuizSettingsTopbar from './start-quiz-topbar';
import { getTranslations } from 'next-intl/server';
import GradientBackground from '@/components/gradient-background';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Rhova',
    description: t('metadata.quiz-settings-description'),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative min-h-dvh'>
      <GradientBackground />
      <QuizSettingsTopbar />
      <main className='max-w-[600px] m-auto pt-4 px-4'>{children}</main>
    </div>
  );
}
