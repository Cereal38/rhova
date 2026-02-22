import Question from './question';

export default interface ShowQuestionPayload extends Question {
  questionIndex: number;
  totalQuestions: number;
}
