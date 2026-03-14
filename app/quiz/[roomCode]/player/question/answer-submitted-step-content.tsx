import AnswerButton from '@/components/answer-button';
import CustomLoader from '@/components/custom-spinner';
import { CircleEllipsis } from 'lucide-react';

interface Props {
  answerNumber?: number;
}

export default function AnswerSubmittedStepContent({ answerNumber }: Props) {
  return (
    // <main className='h-full flex flex-col p-8'>
    //   <h1 className='flex-1 flex items-center justify-center text-5xl'>
    //     Answer submitted
    //   </h1>
    //   <div className='flex flex-col gap-4 items-center'>
    //     {answerNumber && <AnswerButton number={answerNumber} iconOnly={true} />}
    //     <span className='opacity-75 text-center'>
    //       Your answer has been registered. Waiting for the host.
    //     </span>
    //   </div>
    // </main>

    <main className='h-full flex flex-col p-8'>
      <div className='flex-1 flex flex-col gap-12 items-center justify-center'>
        <CustomLoader size={16} />
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-4xl font-bold text-center'>Answer submitted</h2>
          <span className='text-center'>
            Your answer has been registered. Waiting for the host.
          </span>
        </div>
      </div>
    </main>
  );
}
