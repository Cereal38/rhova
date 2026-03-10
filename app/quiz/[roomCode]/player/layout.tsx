import type { Metadata } from 'next';
import QuizPlayerLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Play a quiz together',
};

interface Props {
  children: React.ReactNode;
}

export default function QuizPlayerLayout({ children }: Props) {
  return <QuizPlayerLayoutClient>{children}</QuizPlayerLayoutClient>;
}
