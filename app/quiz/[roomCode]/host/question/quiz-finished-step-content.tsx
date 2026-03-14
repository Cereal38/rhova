'useClient';

import WsLeaderboardItem from '@/models/interfaces/ws-leaderboard-item';
import { useEffect, useState } from 'react';

interface Props {
  leaderboard?: WsLeaderboardItem[];
}

export default function QuizFinishedStepContent({ leaderboard }: Props) {
  const [averageScore, setAverageScore] = useState<number>();

  useEffect(() => {
    if (!leaderboard) return;

    const totalScore = leaderboard.reduce(
      (acc, player) => acc + player.score,
      0,
    );
    const numberOfPlayers = leaderboard.length;

    setAverageScore(totalScore / numberOfPlayers);
  }, [leaderboard]);

  return (
    <main className='h-full mx-auto w-[90%] overflow-y-auto py-12'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Quiz finished!</h1>
        <p className='text-sm text-gray-500'>
          The quiz has finished. The average score is {averageScore}.
        </p>
      </div>
    </main>
  );
}
