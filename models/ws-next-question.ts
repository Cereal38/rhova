import WsQuestion from './ws-question';

export default interface WsNextQuestion {
  isQuizFinished: boolean;
  question: WsQuestion | null;
}
