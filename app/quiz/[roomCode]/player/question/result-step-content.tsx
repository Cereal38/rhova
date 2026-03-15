import WsPlayerResult from '@/models/interfaces/ws-player-result';
import { useConfetti } from '@/hooks/use-confetti';
import { CircleCheck, CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  playerResult?: WsPlayerResult;
}

export default function ResultStepContent({ playerResult }: Props) {
  useConfetti(playerResult?.wasCorrect ?? false);
  const t = useTranslations();

  return (
    <main className='h-full flex'>
      {playerResult && (
        <>
          <div className='flex-1 flex flex-col gap-6 items-center justify-center'>
            {playerResult.wasCorrect ? (
              <CircleCheck className='h-32! w-32! text-green-600' />
            ) : (
              <CircleX className='h-32! w-32! text-red-600' />
            )}
            <div className='flex flex-col items-center gap-2'>
              <h2 className='text-4xl font-bold text-center'>
                {playerResult.wasCorrect ? t('player-question.correct') : t('player-question.wrong')}
              </h2>
              <span className='text-center'>
                {t('player-question.correct-answer-hint', {
                  answer: playerResult.correctAnswer,
                })}
              </span>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
