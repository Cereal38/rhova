import { SessionPhase } from '../enums/session-phase';
import WsPlayerResult from './ws-player-result';
import { WsPlayerScore } from './ws-player-score';
import WsQuestion from './ws-question';

export interface WsPlayerConnect {
  phase: SessionPhase;
  currentQuestion: WsQuestion | null;
  hasAnswered?: boolean;
  playerResult?: WsPlayerResult;
  finalScore?: WsPlayerScore;
}
