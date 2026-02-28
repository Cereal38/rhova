import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Play a quiz together',
};

interface Props {
  children: React.ReactNode;
}

export default function QuizPlayerLayout({ children }: Props) {
  return <div className='h-dvh'>{children}</div>;
}
