import { WsPlayerScore } from '@/models/ws-player-score';

interface Props {
  playerFinalScore?: WsPlayerScore;
}

export default function QuizFinishedStepContent({ playerFinalScore }: Props) {
  return (
    <main className='h-full flex flex-col p-8'>
      <h1 className='flex-1 flex items-center justify-center text-5xl'>
        Quiz finished!
      </h1>
      <div className='flex flex-col gap-4 items-center'>
        <span className='text-xl'>
          {playerFinalScore?.score}/{playerFinalScore?.total}
        </span>
      </div>
    </main>
  );
}
