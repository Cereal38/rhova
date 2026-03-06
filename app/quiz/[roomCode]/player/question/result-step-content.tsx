import AnswerButton from '@/components/answer-button';
import WsPlayerResult from '@/models/ws-player-result';
import WsQuestion from '@/models/ws-question';

interface Props {
  question: WsQuestion;
  playerResult: WsPlayerResult;
}

export default function ResultStepContent({ question, playerResult }: Props) {
  return (
    <main className='h-full flex flex-col p-8'>
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
    </main>
  );
}
