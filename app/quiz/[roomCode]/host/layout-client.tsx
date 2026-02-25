'use client';

import HostQuizTopbar from '@/components/host-quiz-topbar';
import { useHostRejoin } from '@/hooks/use-host-rejoin';
import { useParams } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function QuizHostLayoutClient({ children }: Props) {
  const { roomCode } = useParams<{ roomCode: string }>();
  useHostRejoin(roomCode);

  return (
    <>
      <HostQuizTopbar />
      {children}
    </>
  );
}
