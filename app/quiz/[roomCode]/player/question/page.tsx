'use client';

import AnswerButton from '@/components/answer-button';
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
    <main className='h-full flex flex-col p-8'>
      {question && (
        <>
          <h1 className='flex-1 flex items-center justify-center text-5xl'>
            Question {question.questionIndex + 1}
          </h1>
          <div className='grid grid-cols-2 gap-4'>
            {question.answers.map((answer, index) => (
              <AnswerButton key={answer} number={index + 1} iconOnly={true} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
