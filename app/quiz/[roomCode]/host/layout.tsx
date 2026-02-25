import type { Metadata } from 'next';
import QuizHostLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Play a quiz together',
};

interface Props {
  children: React.ReactNode;
}

export default function QuizHostLayout({ children }: Props) {
  return <QuizHostLayoutClient>{children}</QuizHostLayoutClient>;
}
