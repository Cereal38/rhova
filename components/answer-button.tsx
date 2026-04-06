import { cn } from '@/lib/utils';
import ParallelStrokes from './parallel-strokes';

interface Props {
  children?: React.ReactNode;
  number: number; // That app has multiple design to differenciate answers. Number value handle it
  clickable?: boolean;
  wrongAnswer?: boolean;
  iconOnly?: boolean; // Should we display the answer text or only the icon ?
  onClick?: () => void;
  answerCount?: number;
  totalPlayer?: number;
  displayCount?: boolean;
}

const colorByNumber: Record<number, string> = {
  1: 'bg-[var(--answer-color-1)] hover:bg-[var(--answer-color-1)]',
  2: 'bg-[var(--answer-color-2)] hover:bg-[var(--answer-color-2)]',
  3: 'bg-[var(--answer-color-3)] hover:bg-[var(--answer-color-3)]',
  4: 'bg-[var(--answer-color-4)] hover:bg-[var(--answer-color-4)]',
};

export default function AnswerButton({
  children,
  number,
  clickable = false,
  wrongAnswer = false,
  iconOnly = false,
  onClick,
  answerCount,
  totalPlayer,
  displayCount = false,
}: Readonly<Props>) {
  const interactive = Boolean(clickable && onClick && !wrongAnswer);

  const className = cn(
    'relative flex items-center gap-6 p-12 w-full rounded-xl text-white',
    colorByNumber[number],
    clickable && !wrongAnswer && 'cursor-pointer hover:opacity-75',
    wrongAnswer && 'opacity-25',
    iconOnly && 'justify-center',
  );

  const inner = (
    <>
      {displayCount && (
        <span className='absolute top-4 right-4'>
          {answerCount ?? 0} / {totalPlayer ?? 0}
        </span>
      )}
      <ParallelStrokes size={32} count={number} color='white' />
      {!iconOnly && <span className='text-3xl font-bold'>{children}</span>}
    </>
  );

  if (interactive) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={cn(
          className,
          'border-0 font-inherit text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        )}
      >
        {inner}
      </button>
    );
  }

  return <div className={className}>{inner}</div>;
}
