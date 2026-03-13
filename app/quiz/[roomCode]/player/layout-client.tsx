'use client';

import { useParams } from 'next/navigation';
import SessionPendingDialog from './session-pending-dialog';
import { usePlayerConnect } from '@/hooks/use-player-connect';

interface Props {
  children: React.ReactNode;
}

export default function QuizPlayerLayoutClient({ children }: Props) {
  const { roomCode } = useParams<{ roomCode: string }>();
  usePlayerConnect(roomCode);

  return (
    <div className='h-dvh'>
      {children}
      <SessionPendingDialog />
    </div>
  );
}
