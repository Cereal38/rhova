'use client';

import AnswerButton from '@/components/answer-button';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HostQuestionPage() {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [question, setQuestion] = useState<WsQuestion>();
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [playerCount, setPlayerCount] = useState<number>();
  const [answerCount, setAnswerCount] = useState<number>(0);

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        setRoomNotFound(true);
        return;
      }

      setQuestion(res.payload);
    };

    const getPlayerCountHandler = (res: WsCallback<number>) => {
      setPlayerCount(res.payload);
      console.log(res);
    };

    const getAnswerCountHandler = (count: number) => {
      console.log(count);
      setAnswerCount(count);
    };

    socket.emit('get-question', roomCode, getQuestionHandler);
    socket.emit('get-player-count', roomCode, getPlayerCountHandler);
    socket.on('answer-count', getAnswerCountHandler);

    return () => {
      socket.off('answer-count', getAnswerCountHandler);
    };
  }, [socket, roomCode]);

  if (roomNotFound) {
    notFound();
  }

  return (
    <main className='flex-1 flex flex-col justify-between'>
      <div>
        {!!question && (
          <div className='h-full flex flex-col items-center justify-center'>
            <h2 className='text-xl'>Question {question.questionIndex + 1}</h2>
            <span className='opacity-75'>
              {answerCount}/{playerCount} players answered
            </span>
          </div>
        )}
      </div>
      {!!question && (
        <div className='flex-1 flex items-center justify-center'>
          <h1 className='text-5xl text-center'>{question?.question}</h1>
        </div>
      )}
      <div className='grid grid-cols-2 gap-4'>
        {question?.answers.map((answer, index) => (
          <AnswerButton key={answer} number={index + 1} clickable wrongAnswer>
            {answer}
          </AnswerButton>
        ))}
      </div>
    </main>
  );
}
