import ScoreChart from '@/components/score-chart';
import { Button } from '@/components/ui/button';
import { WsPlayerScore } from '@/models/interfaces/ws-player-score';

interface Props {
  playerFinalScore?: WsPlayerScore;
}

export default function QuizFinishedStepContent({ playerFinalScore }: Props) {
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
              <h2 className='text-center text-3xl'>Quiz finished!</h2>
              <span className='text-center'>
                Click on the home button to play a new quiz
              </span>
            </div>
          </div>
          <Button>Back to home</Button>
        </>
      )}
    </main>
  );
}
