import Question from './question';

export default interface Quiz {
  title: string;
  questions: Question[];
}
