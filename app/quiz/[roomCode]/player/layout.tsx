import type { Metadata } from 'next';
import QuizPlayerLayoutClient from './layout-client';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Rhova',
    description: t('metadata.quiz-play-description'),
  };
}

interface Props {
  children: React.ReactNode;
}

export default function QuizPlayerLayout({ children }: Props) {
  return <QuizPlayerLayoutClient>{children}</QuizPlayerLayoutClient>;
}
