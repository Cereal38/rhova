import Question from './question';

export default interface QuizInput {
  title: string;
  questions: Question[];
}
