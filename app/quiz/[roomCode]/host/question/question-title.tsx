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
  const [totalPlayerCount, setTotalPlayerCount] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        console.error('Could not find the question for the given roomCode');
        setRoomNotFound(true);
        return;
      }

      setQuestion(res.payload);
    };

    const playerCountHandler = (res: WsCallback<number>) => {
      setTotalPlayerCount(res.payload);
      console.log(res);
    };

    socket.emit('get-question', roomCode, getQuestionHandler);

    socket.emit('get-player-count', roomCode, playerCountHandler);
  }, [socket, roomCode]);

  if (roomNotFound) {
    notFound();
  }

  return (
    <>
      {!!question && (
        <div>
          <h2>Question {question.questionIndex + 1}</h2>
          <span>
            {0}/{totalPlayerCount} players answered
          </span>
          {/* <h1>{question.question}</h1> */}
        </div>
      )}
    </>
  );
}
