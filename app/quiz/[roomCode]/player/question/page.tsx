'use client';

import { useSocket } from '@/hooks/use-socket';
import WsCallback from '@/models/interfaces/ws-callback';
import WsPlayerResult from '@/models/interfaces/ws-player-result';
import { WsPlayerScore } from '@/models/interfaces/ws-player-score';
import WsQuestion from '@/models/interfaces/ws-question';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuestionStepContent from './question-step-content';
import AnswerSubmittedStepContent from './answer-submitted-step-content';
import ResultStepContent from './result-step-content';
import QuizFinishedStepContent from './quiz-finished-step-content';
import { EventName } from '@/models/enums/event-name';

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

    socket.emit(EventName.GetQuestion, roomCode, getQuestionHandler);
    socket.on(EventName.ShowQuestion, showQuestionHandler);
    socket.on(EventName.PlayerResult, playerResultHandler);
    socket.on(EventName.QuizFinished, quizFinishHandler);
    return () => {
      socket.off(EventName.ShowQuestion, showQuestionHandler);
      socket.off(EventName.PlayerResult, playerResultHandler);
      socket.off(EventName.QuizFinished, quizFinishHandler);
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

    socket.emit(EventName.SubmitAnswer, roomCode, answer, (res: WsCallback) => {
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
      return <ResultStepContent playerResult={playerResult} />;
    case Step.quizFinished:
      return <QuizFinishedStepContent playerFinalScore={playerFinalScore} />;
  }
}
