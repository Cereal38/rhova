import ScoreChart from '@/components/score-chart';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { WsPlayerScore } from '@/models/interfaces/ws-player-score';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  playerFinalScore?: WsPlayerScore;
}

export default function QuizFinishedStepContent({ playerFinalScore }: Props) {
  const t = useTranslations();

  return (
    <main className='h-full flex flex-col justify-between p-8'>
      {playerFinalScore && (
        <>
          <div className='flex-1 flex flex-col justify-center items-center gap-8'>
            <ScoreChart
              score={playerFinalScore.score}
              max={playerFinalScore?.total}
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-center text-3xl'>{t('player-quiz-finished.title')}</h2>
              <span className='text-center'>{t('player-quiz-finished.play-again')}</span>
            </div>
          </div>
          <Button asChild>
            <Link href={routes.home()}>{t('common.home')}</Link>
          </Button>
        </>
      )}
    </main>
  );
}
