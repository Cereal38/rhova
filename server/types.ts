import Quiz from '@/app/models/quiz';

export interface Player {
  socketId: string;
  playerNumber: number;
  score: number;
}

export type SessionPhase = 'lobby' | 'question' | 'results' | 'finished';

export interface Session {
  roomCode: string;
  quiz: Quiz;
  hostSocketId: string;
  players: Map<string, Player>; // socketId → Player
  playerCounter: number; // auto-incrementing player number
  currentQuestionIndex: number;
  phase: SessionPhase;
  answers: Map<string, string>; // socketId → selected answer
}
