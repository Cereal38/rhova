import type { Metadata } from 'next';
import QuizSettingsTopbar from './quiz-settings-topbar';
import { getTranslations } from 'next-intl/server';

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
    <>
      <QuizSettingsTopbar />
      <main className='max-w-[600px] m-auto pt-4 px-4'>{children}</main>
    </>
  );
}
