import { SessionPhase } from '@/models/enums/session-phase';
import Quiz from '@/models/interfaces/quiz';

export interface Player {
  socketId: string;
  playerNumber: number;
  score: number;
  token: string;
}

export interface Session {
  roomCode: string;
  quiz: Quiz;
  hostSocketId: string;
  players: Map<string, Player>; // socketId → Player
  playerCounter: number; // auto-incrementing player number
  currentQuestionIndex: number;
  phase: SessionPhase;
  answers: Map<string, string>; // socketId → selected answer
  hostToken: string;
  shuffledAnswers: string[] | null; // cached shuffled answers for the current question
}
