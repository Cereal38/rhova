import Question from './question';

export default interface WsQuestion extends Question {
  questionIndex: number;
  totalQuestions: number;
}
