import AnswerButton from '@/components/answer-button';

interface Props {
  answerNumber?: number;
}

export default function AnswerSubmittedStepContent({ answerNumber }: Props) {
  return (
    <main className='h-full flex flex-col p-8'>
      <h1 className='flex-1 flex items-center justify-center text-5xl'>
        Answer submitted
      </h1>
      <div className='flex flex-col gap-4 items-center'>
        {answerNumber && <AnswerButton number={answerNumber} iconOnly={true} />}
        <span className='opacity-75 text-center'>
          Your answer has been registered. Waiting for the host.
        </span>
      </div>
    </main>
  );
}
