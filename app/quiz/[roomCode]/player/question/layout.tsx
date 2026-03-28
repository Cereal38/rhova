import GradientBackground from '@/components/gradient-background';

interface Props {
  children: React.ReactNode;
}

export default function PlayerQuestionLayout({ children }: Readonly<Props>) {
  return (
    <div className='relative flex min-h-0 w-full flex-1 flex-col'>
      <GradientBackground dark />
      {children}
    </div>
  );
}
