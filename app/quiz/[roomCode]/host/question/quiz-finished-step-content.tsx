'useClient';

import ScoreChart from '@/components/score-chart';
import WsLeaderboardItem from '@/models/interfaces/ws-leaderboard-item';
import { useEffect, useState } from 'react';

interface Props {
  leaderboard?: WsLeaderboardItem[];
}

export default function QuizFinishedStepContent({ leaderboard }: Props) {
  const [averageScore, setAverageScore] = useState<number>(0);
  // TODO: Don't hardcode the max score
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(10);

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
      <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
        <ScoreChart score={averageScore} max={10} />
        <div className='flex flex-col gap-2'>
          <h1 className='text-center text-4xl font-bold'>Quiz finished!</h1>
          <p className='text-center'>
            The average player score is 2 out of 10.
          </p>
        </div>
      </div>
    </main>
  );
}
