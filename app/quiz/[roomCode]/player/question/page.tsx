'use client';

import AnswerButton from '@/components/answer-button';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsPlayerResult from '@/models/ws-player-result';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlayerQuestionPage() {
  const { roomCode } = useParams();
  const { socket } = useSocket();

  const [roomNotFound, setRoomNotFound] = useState(false);
  const [question, setQuestion] = useState<WsQuestion>();
  const [chosenAnswer, setChosenAnswer] = useState<{
    answer: string;
    answerNumber: number;
  }>();
  const [playerResult, setPlayerResult] = useState<WsPlayerResult>();

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        setRoomNotFound(true);
      }

      setQuestion(res.payload);
    };

    const showQuestionHandler = (wsQuestion: WsQuestion) => {
      if (!wsQuestion) {
        console.error('An error occurred while fetching the question');
        return;
      }

      setQuestion(wsQuestion);
      setChosenAnswer(undefined);
      setPlayerResult(undefined);
    };

    const playerResultHandler = (result: WsPlayerResult) => {
      if (!result) {
        console.error('An error occurred while while fetching question result');
        return;
      }

      setPlayerResult(result);
    };

    const quizFinishHandler = () => {
      alert('Quiz is finished!');
    };

    socket.emit('get-question', roomCode, getQuestionHandler);
    socket.on('show-question', showQuestionHandler);
    socket.on('player-result', playerResultHandler);
    socket.on('quiz-finished', quizFinishHandler);
    return () => {
      socket.off('showQuestion', showQuestionHandler);
      socket.off('player-result', playerResultHandler);
      socket.off('quiz-finished', quizFinishHandler);
    };
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
          {/* Case 1 - Initial state, display the answers */}
          {!chosenAnswer && !playerResult && (
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
          {/* Case 2 - The user answered, display his answer */}
          {chosenAnswer && !playerResult && (
            <div className='flex flex-col gap-4 items-center'>
              <AnswerButton
                number={chosenAnswer.answerNumber}
                iconOnly={true}
              />
              <span className='opacity-75 text-center'>
                Your answer has been registered. Waiting for the host.
              </span>
            </div>
          )}
          {/* Case 3 - Results has been published. Display if the user was correct */}
          {playerResult && (
            <div className='flex flex-col gap-4 items-center'>
              <AnswerButton
                number={
                  question.answers.indexOf(playerResult.correctAnswer) + 1
                }
                iconOnly={true}
              />
              <span className='opacity-75 text-center'>
                "{playerResult.correctAnswer}" was the correct answer
              </span>
            </div>
          )}
        </>
      )}
    </main>
  );
}
