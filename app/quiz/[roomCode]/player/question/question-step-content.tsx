import AnswerButton from '@/components/answer-button';
import WsQuestion from '@/models/ws-question';

interface Props {
  question?: WsQuestion;
  onSubmitAnswer: (answer: string, answerNumber: number) => void;
}

export default function QuestionStepContent({
  question,
  onSubmitAnswer,
}: Props) {
  return (
    <main className='h-full flex flex-col p-8'>
      {question && (
        <>
          <h1 className='flex-1 flex items-center justify-center text-5xl'>
            Question {question.questionIndex + 1}
          </h1>
          <div className='grid grid-cols-2 gap-4'>
            {question.answers.map((answer, index) => (
              <AnswerButton
                key={answer}
                number={index + 1}
                iconOnly={true}
                clickable={true}
                onClick={() => onSubmitAnswer(answer, index + 1)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
