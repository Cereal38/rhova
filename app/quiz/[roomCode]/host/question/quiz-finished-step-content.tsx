'use client';

import ScoreChart from '@/components/score-chart';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import WsLeaderboardItem from '@/models/interfaces/ws-leaderboard-item';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';

interface Props {
  leaderboard?: WsLeaderboardItem[];
  numberOfQuestions?: number;
}

export default function QuizFinishedStepContent({
  leaderboard,
  numberOfQuestions,
}: Props) {
  const t = useTranslations();
  const averageScore = useMemo(() => {
    if (!leaderboard || leaderboard.length === 0) return 0;

    const totalScore = leaderboard.reduce(
      (acc, player) => acc + player.score,
      0,
    );

    return parseFloat((totalScore / leaderboard.length).toFixed(1)) || 0;
  }, [leaderboard]);

  return (
    <main className='h-full mx-auto w-[90%] overflow-y-auto py-12'>
      {leaderboard && numberOfQuestions && (
        <Card className='p-8 w-full h-full flex flex-col items-center justify-center gap-8'>
          <ScoreChart score={averageScore} max={numberOfQuestions} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-center text-4xl font-bold'>
              {t('host-quiz-finished.title')}
            </h1>
            <p className='text-center'>
              {t('host-quiz-finished.average-score', {
                averageScore: averageScore,
                numberOfQuestions,
              })}
            </p>
          </div>
          <Button asChild className='mt-4 cursor-pointer'>
            <Link href={routes.start()}>
              {t('host-quiz-finished.start-new-quiz')}
            </Link>
          </Button>
        </Card>
      )}
    </main>
  );
}
