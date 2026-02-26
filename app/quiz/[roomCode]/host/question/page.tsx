import PossibleAnswers from './possible-answers';
import QuestionTitle from './question-title';

export default function HostQuestionPage() {
  return (
    <main className='h-full flex flex-col justify-between'>
      <QuestionTitle />
      <PossibleAnswers />
    </main>
  );
}
