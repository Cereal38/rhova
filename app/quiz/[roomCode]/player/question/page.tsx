'use client';

import AnswerButton from '@/components/answer-button';
import { useSocket } from '@/hooks/use-socket';
import { routes } from '@/lib/routes';
import WsCallback from '@/models/ws-callback';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerQuestionPage() {
  const { roomCode } = useParams();
  const { socket } = useSocket();

  const [question, setQuestion] = useState<WsQuestion>();
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<{
    answer: string;
    answerNumber: number;
  }>();

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

  const submitAnswerHandler = (answer: string, answerNumber: number) => {
    setChosenAnswer({ answer, answerNumber });

    if (!socket || !roomCode) {
      setChosenAnswer(undefined);
      return;
    }

    socket.emit('submit-answer', roomCode, answer, (res: WsCallback) => {
      if (!res.success) {
        setChosenAnswer(undefined);
      }
    });
  };

  return (
    <main className='h-full flex flex-col p-8'>
      {question && (
        <>
          <h1 className='flex-1 flex items-center justify-center text-5xl'>
            Question {question.questionIndex + 1}
          </h1>
          {/* If the user select an answer, change the display to show his selection */}
          {chosenAnswer ? (
            <div className='flex flex-col gap-4 items-center'>
              <AnswerButton
                number={chosenAnswer.answerNumber}
                iconOnly={true}
              />
              <span className='opacity-75 text-center'>
                Your answer has been registered. Waiting for the host.
              </span>
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {question.answers.map((answer, index) => (
                <AnswerButton
                  key={answer}
                  number={index + 1}
                  iconOnly={true}
                  clickable={true}
                  onClick={() => submitAnswerHandler(answer, index + 1)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
