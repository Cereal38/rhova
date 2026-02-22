'use client';

import { useSocket } from '@/hooks/use-socket';
import ShowQuestionPayload from '@/models/show-question-payload';
import { useEffect, useState } from 'react';

export default function QuestionNumber() {
  const { socket } = useSocket();
  const [questionNumber, setQuestionNumber] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!socket) return;

    const handler = (question: ShowQuestionPayload) => {
      setQuestionNumber(question.questionIndex + 1);
    };

    socket.on('show-question', handler);

    return () => {
      socket.off('show-question', handler);
    };
  }, [socket]);

  return <>{questionNumber}</>;
}
