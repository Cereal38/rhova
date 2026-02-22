'use client';

import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuestionNumber() {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [questionNumber, setQuestionNumber] = useState<number | undefined>(
    undefined,
  );
  const [roomNotFound, setRoomNotFound] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        console.error('Could not find the question for the given roomCode');
        setRoomNotFound(true);
        return;
      }

      setQuestionNumber(res.payload.questionIndex + 1);
    };

    socket.emit('get-question', roomCode, handler);
  }, [socket]);

  if (roomNotFound) {
    notFound();
  }

  return <>{questionNumber}</>;
}
