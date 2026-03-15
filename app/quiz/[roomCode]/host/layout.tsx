import type { Metadata } from 'next';
import QuizHostLayoutClient from './layout-client';
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

export default function QuizHostLayout({ children }: Props) {
  return <QuizHostLayoutClient>{children}</QuizHostLayoutClient>;
}
