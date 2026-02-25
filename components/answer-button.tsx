import { Button } from './ui/button';

type Props = {
  children: React.ReactNode;
  number: number; // Tha app has multiple design to differenciate answers. Number value handle it
};

const colorByNumber: Record<number, string> = {
  1: 'bg-[var(--answer-color-1)] hover:bg-[var(--answer-color-1)]',
  2: 'bg-[var(--answer-color-2)] hover:bg-[var(--answer-color-2)]',
  3: 'bg-[var(--answer-color-3)] hover:bg-[var(--answer-color-3)]',
  4: 'bg-[var(--answer-color-4)] hover:bg-[var(--answer-color-4)]',
};

export default function AnswerButton({ children, number }: Props) {
  return (
    <Button className={colorByNumber[number]}>
      {children}
    </Button>
  );
}
