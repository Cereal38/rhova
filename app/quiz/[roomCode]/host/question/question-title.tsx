'use client';

import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QuestionTitle() {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [question, setQuestion] = useState<WsQuestion | undefined>(undefined);
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [playerCount, setPlayerCount] = useState<number | undefined>(undefined);
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
    <>
      {!!question && (
        <div className='flex flex-col items-center'>
          <h2 className='text-xl'>Question {question.questionIndex + 1}</h2>
          <span className='opacity-75'>
            {answerCount}/{playerCount} players answered
          </span>
        </div>
      )}
    </>
  );
}
