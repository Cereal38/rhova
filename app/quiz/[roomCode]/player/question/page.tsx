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

    const quizFinishHandler = (playerScore: WsPlayerScore) => {
      alert('Quiz is finished!');
      setPlayerFinalScore(playerScore);
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

  if (!chosenAnswer && !playerResult) {
    return (
      <QuestionStepContent
        question={question}
        onSubmitAnswer={submitAnswerHandler}
      />
    );
  } else if (chosenAnswer && !playerResult) {
    return (
      <AnswerSubmittedStepContent answerNumber={chosenAnswer.answerNumber} />
    );
  } else if (playerResult) {
    return (
      <ResultStepContent question={question} playerResult={playerResult} />
    );
  } else if (playerFinalScore) {
    return <QuizFinishedStepContent playerFinalScore={playerFinalScore} />;
  }
}
