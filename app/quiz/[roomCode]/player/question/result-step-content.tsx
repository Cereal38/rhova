import AnswerButton from '@/components/answer-button';
import { cn } from '@/lib/utils';
import WsPlayerResult from '@/models/interfaces/ws-player-result';
import WsQuestion from '@/models/interfaces/ws-question';
import { useConfetti } from '@/hooks/use-confetti';

interface Props {
  question?: WsQuestion;
  playerResult?: WsPlayerResult;
}

const bgColor: Record<string, string> = {
  correct: 'bg-[var(--answer-correct)]',
  wrong: 'bg-[var(--answer-wrong)]',
};

export default function ResultStepContent({ question, playerResult }: Props) {
  useConfetti(playerResult?.wasCorrect ?? false);

  return (
    <main
      className={cn(
        'h-full flex flex-col p-8',
        bgColor[playerResult?.wasCorrect ? 'correct' : 'wrong'],
      )}
    >
      {question && playerResult && (
        <>
          <h1 className='flex-1 flex items-center justify-center text-5xl'>
            {playerResult.wasCorrect ? 'Correct!' : 'Wrong!'}
          </h1>
          <div className='flex flex-col gap-4 items-center'>
            <AnswerButton
              number={question.answers.indexOf(playerResult.correctAnswer) + 1}
              iconOnly={true}
            />
            <span className='opacity-75 text-center'>
              "{playerResult.correctAnswer}" was the correct answer
            </span>
          </div>
        </>
      )}
    </main>
  );
}
