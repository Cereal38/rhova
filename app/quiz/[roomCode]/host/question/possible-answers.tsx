'use client';

import AnswerButton from '@/components/answer-button';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PossibleAnswers() {
  const { socket } = useSocket();
  const { roomCode } = useParams();

  const [question, setQuestion] = useState<WsQuestion | undefined>(undefined);
  const [roomNotFound, setRoomNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        console.error(`Room with code ${roomCode} not found`);
        setRoomNotFound(true);
        return;
      }

      setQuestion(res.payload);
    };

    socket.emit('get-question', roomCode, getQuestionHandler);
  }, [socket, roomCode]);

  if (roomNotFound) {
    notFound();
  }

  return (
    <div>
      {question?.answers.map((answer) => (
        <AnswerButton key={answer}>{answer}</AnswerButton>
      ))}
    </div>
  );
}
