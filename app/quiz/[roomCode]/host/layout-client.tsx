'use client';

import { useHostRejoin } from '@/hooks/use-host-rejoin';
import { useParams } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function QuizHostLayoutClient({ children }: Props) {
  const { roomCode } = useParams<{ roomCode: string }>();
  useHostRejoin(roomCode);

  return <div className='flex flex-col h-dvh'>{children}</div>;
}
