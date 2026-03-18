export default interface WsQuestionResult {
  correctAnswer: string;
  answerCounts: Record<string, number>; // The number of people who selected each answer
}
