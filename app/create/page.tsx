import { Card } from '@/components/ui/card';
import StepManager from './step-manager';

export default function CreateQuiz() {
  return (
    <main className='flex-1 flex items-center justify-center max-w-[600px] m-auto px-4'>
      <Card className='flex flex-col gap-2 p-8 md:min-w-[400px]'>
        <StepManager />
      </Card>
    </main>
  );
}
