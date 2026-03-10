'use client';

import { useParams } from 'next/navigation';
import SessionPendingDialog from './session-pending-dialog';
import { usePlayerRejoin } from '@/hooks/use-player-rejoin';

interface Props {
  children: React.ReactNode;
}

export default function QuizPlayerLayoutClient({ children }: Props) {
  const { roomCode } = useParams<{ roomCode: string }>();
  usePlayerRejoin(roomCode);

  return (
    <div className='h-dvh'>
      {children}
      <SessionPendingDialog />
    </div>
  );
}
