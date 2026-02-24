import Quiz from '@/models/quiz';
import type { Session, Player } from './types';
import WsQuestion from '@/models/ws-question';

const sessions = new Map<string, Session>();
const pendingDisconnectSessions = new Map<string, NodeJS.Timeout>();

// --- Room code generation ---

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateUniqueRoomCode(): string {
  let code = generateRoomCode();
  while (sessions.has(code)) {
    code = generateRoomCode();
  }
  return code;
}

// --- Session lifecycle ---

export function createSession(quiz: Quiz, hostSocketId: string): Session {
  const roomCode = generateUniqueRoomCode();

  const session: Session = {
    roomCode,
    quiz,
    hostSocketId,
    players: new Map(),
    playerCounter: 0,
    currentQuestionIndex: 0,
    phase: 'lobby',
    answers: new Map(),
  };

  sessions.set(roomCode, session);
  return session;
}

export function getSession(roomCode: string): Session | undefined {
  return sessions.get(roomCode);
}

export function deleteSession(roomCode: string): void {
  sessions.delete(roomCode);
}

export function addPendingDisconnectSession(
  roomCode: string,
  timeout: NodeJS.Timeout,
) {
  pendingDisconnectSessions.set(roomCode, timeout);
}

export function getPendingDisconnectSession(
  roomCode: string,
): NodeJS.Timeout | undefined {
  return pendingDisconnectSessions.get(roomCode);
}

export function deletePendingDisconnectSession(roomCode: string) {
  pendingDisconnectSessions.delete(roomCode);
}

// --- Player management ---

export function addPlayer(roomCode: string, socketId: string): Player | null {
  const session = sessions.get(roomCode);
  if (!session || session.phase !== 'lobby') return null;

  session.playerCounter++;
  const player: Player = {
    socketId,
    playerNumber: session.playerCounter,
    score: 0,
  };
  session.players.set(socketId, player);
  return player;
}

export function removePlayer(roomCode: string, socketId: string): void {
  const session = sessions.get(roomCode);
  if (!session) return;
  session.players.delete(socketId);
}

export function getPlayerCount(roomCode: string): number {
  const session = sessions.get(roomCode);
  if (!session) return 0;
  return session.players.size;
}

// --- Quiz flow ---

export function startQuiz(roomCode: string, socketId: string): boolean {
  const session = sessions.get(roomCode);
  if (!session) return false;
  if (session.hostSocketId !== socketId) return false;
  if (session.phase !== 'lobby') return false;

  session.phase = 'question';
  session.currentQuestionIndex = 0;
  session.answers.clear();
  return true;
}

export function getCurrentQuestion(roomCode: string): WsQuestion | null {
  const session = sessions.get(roomCode);
  if (!session || session.phase !== 'question') return null;

  const question = session.quiz.questions[session.currentQuestionIndex];
  if (!question) return null;

  const allAnswers = [question.correctAnswer, ...question.wrongAnswers];
  shuffleArray(allAnswers);

  return {
    question: question.question,
    answers: allAnswers,
    questionIndex: session.currentQuestionIndex,
    totalQuestions: session.quiz.questions.length,
  };
}

export function submitAnswer(
  roomCode: string,
  socketId: string,
  answer: string,
): boolean {
  const session = sessions.get(roomCode);
  if (!session || session.phase !== 'question') return false;
  if (!session.players.has(socketId)) return false;
  if (session.answers.has(socketId)) return false;

  session.answers.set(socketId, answer);
  return true;
}

export function getAnswerCount(roomCode: string): {
  count: number;
  total: number;
} {
  const session = sessions.get(roomCode);
  if (!session) return { count: 0, total: 0 };
  return {
    count: session.answers.size,
    total: session.players.size,
  };
}

export function revealResults(roomCode: string, socketId: string) {
  const session = sessions.get(roomCode);
  if (!session) return null;
  if (session.hostSocketId !== socketId) return null;
  if (session.phase !== 'question') return null;

  const question = session.quiz.questions[session.currentQuestionIndex];
  if (!question) return null;

  for (const [playerSocketId, answer] of session.answers) {
    if (answer === question.correctAnswer) {
      const player = session.players.get(playerSocketId);
      if (player) player.score += 1;
    }
  }

  session.phase = 'results';

  const leaderboard = Array.from(session.players.values())
    .map((p) => ({ playerNumber: p.playerNumber, score: p.score }))
    .sort((a, b) => b.score - a.score);

  return {
    correctAnswer: question.correctAnswer,
    leaderboard,
    playerResults: Object.fromEntries(
      Array.from(session.answers).map(([sid, answer]) => [
        sid,
        answer === question.correctAnswer,
      ]),
    ),
  };
}

export function nextQuestion(
  roomCode: string,
  socketId: string,
): 'question' | 'finished' | null {
  const session = sessions.get(roomCode);
  if (!session) return null;
  if (session.hostSocketId !== socketId) return null;
  if (session.phase !== 'results') return null;

  session.currentQuestionIndex++;
  session.answers.clear();

  if (session.currentQuestionIndex >= session.quiz.questions.length) {
    session.phase = 'finished';
    return 'finished';
  }

  session.phase = 'question';
  return 'question';
}

export function getFinalLeaderboard(roomCode: string) {
  const session = sessions.get(roomCode);
  if (!session) return null;

  return Array.from(session.players.values())
    .map((p) => ({ playerNumber: p.playerNumber, score: p.score }))
    .sort((a, b) => b.score - a.score);
}

// --- Utility ---

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
