import WsQuestion from './ws-question';

export default interface WsNextQuestion {
  isQuizFinished: boolean;
  question: WsQuestion | null;
  leaderboard: LeaderboardItem[] | null;
}

interface LeaderboardItem {
  playerNumber: number;
  score: number;
}
