'use client';

import AnswerButton from '@/components/answer-button';
import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/ws-callback';
import WsLeaderboardItem from '@/models/ws-leaderboard-item';
import WsPlayerResult from '@/models/ws-player-result';
import { WsPlayerScore } from '@/models/ws-player-score';
import WsQuestion from '@/models/ws-question';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuestionStepContent from './question-step-content';
import AnswerSubmittedStepContent from './answer-submitted-step-content';
import ResultStepContent from './result-step-content';
import QuizFinishedStepContent from './quiz-finished-step-content';

enum Step {
  'question',
  'answerSubmitted',
  'result',
  'quizFinished',
}

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
  const [playerFinalScore, setPlayerFinalScore] = useState<WsPlayerScore>();
  const [step, setStep] = useState<Step>(Step.question);

  useEffect(() => {
    if (!socket) return;

    const getQuestionHandler = (res: WsCallback<WsQuestion>) => {
      if (!res.success || !res.payload) {
        setRoomNotFound(true);
      }

      setQuestion(res.payload);
      setStep(Step.question);
    };

    const showQuestionHandler = (wsQuestion: WsQuestion) => {
      if (!wsQuestion) {
        console.error('An error occurred while fetching the question');
        return;
      }

      setQuestion(wsQuestion);
      setChosenAnswer(undefined);
      setPlayerResult(undefined);
      setStep(Step.question);
    };

    const playerResultHandler = (result: WsPlayerResult) => {
      if (!result) {
        console.error('An error occurred while while fetching question result');
        return;
      }

      setPlayerResult(result);
      setStep(Step.result);
    };

    const quizFinishHandler = (playerScore: WsPlayerScore) => {
      console.log('player score', playerScore);
      setPlayerFinalScore(playerScore);
      setStep(Step.quizFinished);
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
      setStep(Step.answerSubmitted);
    });
  };

  switch (step) {
    case Step.question:
      return (
        <QuestionStepContent
          question={question}
          onSubmitAnswer={submitAnswerHandler}
        />
      );
    case Step.answerSubmitted:
      return (
        <AnswerSubmittedStepContent answerNumber={chosenAnswer?.answerNumber} />
      );
    case Step.result:
      return (
        <ResultStepContent question={question} playerResult={playerResult} />
      );
    case Step.quizFinished:
      return <QuizFinishedStepContent playerFinalScore={playerFinalScore} />;
  }
}
