import ParallelStrokes from './parallel-strokes';

interface Props {
  children: React.ReactNode;
  number: number; // That app has multiple design to differenciate answers. Number value handle it
}

const colorByNumber: Record<number, string> = {
  1: 'bg-[var(--answer-color-1)] hover:bg-[var(--answer-color-1)]',
  2: 'bg-[var(--answer-color-2)] hover:bg-[var(--answer-color-2)]',
  3: 'bg-[var(--answer-color-3)] hover:bg-[var(--answer-color-3)]',
  4: 'bg-[var(--answer-color-4)] hover:bg-[var(--answer-color-4)]',
};

export default function AnswerButton({ children, number }: Props) {
  return (
    <div
      className={`flex items-center gap-4 p-12 w-full rounded-xl text-white cursor-pointer ${colorByNumber[number]}`}
    >
      <ParallelStrokes size={32} count={number} color='white' />
      <span className='text-3xl font-bold'>{children}</span>
    </div>
  );
}
