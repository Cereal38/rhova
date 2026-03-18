'use client';

import AnswerButton from '@/components/answer-button';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/interfaces/ws-callback';
import WsLeaderboardItem from '@/models/interfaces/ws-leaderboard-item';
import WsNextQuestion from '@/models/interfaces/ws-next-question';
import WsQuestion from '@/models/interfaces/ws-question';
import WsQuestionResult from '@/models/interfaces/ws-question-result';
import { ArrowRight } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuizFinishedStepContent from './quiz-finished-step-content';
import { EventName } from '@/models/enums/event-name';
import { useTranslations } from 'next-intl';

enum Step {
  'quiz',
  'quizFinished',
}

export default function HostQuestionPage() {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [question, setQuestion] = useState<WsQuestion>();
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [playerCount, setPlayerCount] = useState<number>();
  const [answerCount, setAnswerCount] = useState<number>(0);
  const [questionResults, setQuestionResults] = useState<WsQuestionResult>();
  const [step, setStep] = useState<Step>(Step.quiz);
  const [leaderboard, setLeaderboard] = useState<WsLeaderboardItem[]>();
  const t = useTranslations();

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
    };

    const getAnswerCountHandler = (count: number) => {
      setAnswerCount(count);
    };

    socket.emit(EventName.GetQuestion, roomCode, getQuestionHandler);
    socket.emit(EventName.GetPlayerCount, roomCode, getPlayerCountHandler);
    socket.on(EventName.AnswerCount, getAnswerCountHandler);

    return () => {
      socket.off(EventName.AnswerCount, getAnswerCountHandler);
    };
  }, [socket, roomCode]);

  if (roomNotFound) {
    notFound();
  }

  const nextButtonHandler = () => {
    if (!questionResults) {
      revealResults();
    } else {
      nextQuestion();
    }
  };

  const revealResults = () => {
    if (!socket || !roomCode) {
      console.error('Trying to reveal results but no socket or roomCode found');
      return;
    }

    socket.emit(
      EventName.RevealResults,
      roomCode,
      (res: WsCallback<WsQuestionResult>) => {
        if (!res.success || !res.payload) {
          console.error(
            'An error occured while trying to reveal results: ',
            res.error,
          );
          return;
        }

        console.log('Results revealed');

        setQuestionResults(res.payload);
      },
    );
  };

  const nextQuestion = () => {
    if (!socket || !roomCode) {
      console.error('Trying to reveal results but no socket or roomCode found');
      return;
    }

    socket.emit(
      EventName.NextQuestion,
      roomCode,
      (res: WsCallback<WsNextQuestion>) => {
        if (!res.success || !res.payload) {
          console.error('An error occurred while fetching the next question');
          return;
        }

        if (res.payload.isQuizFinished) {
          if (!res.payload.leaderboard) {
            console.error('The leaderboard could not be found');
            return;
          }

          setStep(Step.quizFinished);
          setLeaderboard(res.payload.leaderboard);
          return;
        }

        setQuestion(res.payload.question!);
        setAnswerCount(0);
        setQuestionResults(undefined);
      },
    );
  };

  switch (step) {
    // TODO: Move the content of this step to a dedicated component
    case Step.quiz:
      return (
        <main className='h-full mx-auto w-[90%] overflow-y-auto py-12'>
          <div className='h-full flex flex-col justify-between'>
            {!!question && (
              <>
                <div>
                  <div className='flex flex-col items-center gap-1'>
                    <h2 className='text-xl'>
                      {t('host-question.question-number', {
                        number: question.questionIndex + 1,
                      })}
                    </h2>
                    <span className='opacity-75 -translate-y-[2px]'>
                      {t('host-question.players-answered', {
                        answerCount,
                        playerCount: playerCount ?? 0,
                      })}
                    </span>
                  </div>
                </div>
                <div className='flex-1 flex items-center justify-center relative'>
                  <h1 className='text-5xl text-center'>{question.question}</h1>
                  <Button
                    className='absolute right-0 cursor-pointer translate-y-[8px] h-14 w-14'
                    variant='ghost'
                    size='icon'
                    onClick={() => nextButtonHandler()}
                  >
                    <ArrowRight className='h-8! w-8!' />
                  </Button>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {question?.answers.map((answer, index) => (
                    <AnswerButton
                      key={answer}
                      number={index + 1}
                      wrongAnswer={
                        questionResults &&
                        answer != questionResults?.correctAnswer
                      }
                      displayCount={questionResults !== undefined}
                      answerCount={questionResults?.answerCounts[answer]}
                      totalPlayer={playerCount}
                    >
                      {answer}
                    </AnswerButton>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      );
    case Step.quizFinished:
      return (
        <QuizFinishedStepContent
          leaderboard={leaderboard}
          numberOfQuestions={question?.totalQuestions}
        />
      );
  }
}
