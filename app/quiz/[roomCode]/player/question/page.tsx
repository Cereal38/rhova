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
import {
  clearPlayerConnectState,
  readPlayerConnectState,
} from '@/lib/player-connect-state-storage';
import { SessionPhase } from '@/models/enums/session-phase';

enum Step {
  'question',
  'answerSubmitted',
  'result',
  'quizFinished',
}

export default function PlayerQuestionPage() {
  const { roomCode } = useParams();
  const { socket } = useSocket();
  const roomCodeString = roomCode as string;

  const [initialPlayerConnectState] = useState(() => {
    if (globalThis.window === undefined) return null;

    return readPlayerConnectState(roomCodeString);
  });

  const [roomNotFound, setRoomNotFound] = useState(false);
  const [question, setQuestion] = useState<WsQuestion | undefined>(
    initialPlayerConnectState?.currentQuestion ?? undefined,
  );
  const [playerResult, setPlayerResult] = useState<WsPlayerResult | undefined>(
    initialPlayerConnectState?.playerResult,
  );
  const [playerFinalScore, setPlayerFinalScore] = useState<
    WsPlayerScore | undefined
  >(initialPlayerConnectState?.finalScore);
  const [step, setStep] = useState<Step>(() => {
    if (!initialPlayerConnectState) return Step.question;

    if (initialPlayerConnectState.phase === SessionPhase.Finished) {
      return Step.quizFinished;
    }

    if (initialPlayerConnectState.phase === SessionPhase.Result) {
      return Step.result;
    }

    if (initialPlayerConnectState.hasAnswered) {
      return Step.answerSubmitted;
    }

    return Step.question;
  });

  useEffect(() => {
    if (!socket) return;

    if (initialPlayerConnectState) {
      clearPlayerConnectState(roomCodeString);
    }

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

    if (!initialPlayerConnectState) {
      socket.emit(EventName.GetQuestion, roomCodeString, getQuestionHandler);
    }

    socket.on(EventName.ShowQuestion, showQuestionHandler);
    socket.on(EventName.PlayerResult, playerResultHandler);
    socket.on(EventName.QuizFinished, quizFinishHandler);
    return () => {
      socket.off(EventName.ShowQuestion, showQuestionHandler);
      socket.off(EventName.PlayerResult, playerResultHandler);
      socket.off(EventName.QuizFinished, quizFinishHandler);
    };
  }, [socket, roomCodeString, initialPlayerConnectState]);

  if (roomNotFound) {
    notFound();
  }

  const submitAnswerHandler = (answer: string) => {
    if (!socket || !roomCodeString) {
      return;
    }

    socket.emit(
      EventName.SubmitAnswer,
      roomCodeString,
      answer,
      (res: WsCallback) => {
        if (!res.success) {
          console.error(
            'An error occurred while submitting the answer. Error: ' +
              res.error,
          );
          return;
        }
        setStep(Step.answerSubmitted);
      },
    );
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
      return <AnswerSubmittedStepContent />;
    case Step.result:
      return <ResultStepContent playerResult={playerResult} />;
    case Step.quizFinished:
      return <QuizFinishedStepContent playerFinalScore={playerFinalScore} />;
  }
}
