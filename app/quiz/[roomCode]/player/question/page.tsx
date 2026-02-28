'use client';

import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerQuestionPage() {
  const { roomCode } = useParams();
  const { socket } = useSocket();

  const [question, setQuestion] = useState<WsQuestion>();
  const [roomNotFound, setRoomNotFound] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        setRoomNotFound(true);
      }

      setQuestion(res.payload);
    };

    socket.emit('get-question', roomCode, getQuestionHandler);
  }, [socket, roomCode]);

  if (roomNotFound) {
    notFound();
  }

  return (
    <main className='h-full'>
      {question && <h1>Question {question.questionIndex + 1}</h1>}
    </main>
  );
}
