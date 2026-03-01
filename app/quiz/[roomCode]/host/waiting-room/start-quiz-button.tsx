'use client';

import WsCallback from '@/models/ws-callback';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StartQuizButton() {
  const { socket, isConnected } = useSocket();
  const { roomCode } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setLoading(true);
    console.log('Starting the quiz...');

    if (!socket || !isConnected) {
      setError('Impossible to start the quiz');
      setLoading(false);
      return;
    }

    socket.emit('start-quiz', (res: WsCallback) => {
      if (res.success) {
        router.push(routes.hostQuestion(roomCode as string));
      } else {
        setError(res.error ?? 'Failed to start the quiz');
        setLoading(false);
      }
    });
  };

  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <Button
        onClick={handleStartQuiz}
        className='w-full cursor-pointer'
        disabled={loading}
      >
        {loading && <Spinner />}
        Start the quiz
      </Button>
      {error && <p className='w-full text-destructive text-sm'>{error}</p>}
    </div>
  );
}
