import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';
import {
  createSession,
  getSession,
  deleteSession,
  addPlayer,
  removePlayer,
  getPlayerCount,
  startQuiz,
  getCurrentQuestion,
  submitAnswer,
  getAnswerCount,
  revealResults,
  nextQuestion,
  getFinalLeaderboard,
} from './server/session-manager';
import type Quiz from '@/app/models/quiz';
import WsCallback from './app/models/ws-callback';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // ─── Host: Create a session ───
    socket.on(
      'create-session',
      (quiz: Quiz, callback: (res: { roomCode: string }) => void) => {
        const session = createSession(quiz, socket.id);
        socket.join(session.roomCode);
        socket.data.roomCode = session.roomCode;
        socket.data.role = 'host';

        console.log(`Session created: ${session.roomCode}`);
        callback({ roomCode: session.roomCode });
      },
    );

    // ─── Student: Join a session ───
    socket.on(
      'join-session',
      (roomCode: string, callback: (res: WsCallback) => void) => {
        const session = getSession(roomCode);

        if (!session) {
          callback({ success: false, error: 'Session not found' });
          return;
        }

        if (session.phase !== 'lobby') {
          callback({ success: false, error: 'Quiz has already started' });
          return;
        }

        const player = addPlayer(roomCode, socket.id);
        if (!player) {
          callback({ success: false, error: 'Could not join session' });
          return;
        }

        socket.join(roomCode);
        socket.data.roomCode = roomCode;
        socket.data.role = 'player';

        console.log(`Player ${player.playerNumber} joined ${roomCode}`);
        callback({ success: true });

        // Notify everyone in the room (including host) of new player count
        io.to(roomCode).emit('player-count', {
          count: getPlayerCount(roomCode),
        });
      },
    );

    // ─── Host: Start the quiz ───
    socket.on('start-quiz', (callback: (res: WsCallback) => void) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) return callback({ success: false, error: 'No room code' });

      const started = startQuiz(roomCode, socket.id);
      if (!started)
        return callback({ success: false, error: 'Could not start quiz' });

      const question = getCurrentQuestion(roomCode);
      if (!question)
        return callback({
          success: false,
          error: 'No questions in this quiz',
        });

      console.log(`Quiz started in ${roomCode}`);
      io.to(roomCode).emit('show-question', question);
      callback({ success: true });
    });

    // ─── Student: Submit an answer ───
    socket.on(
      'submit-answer',
      (answer: string, callback: (res: { success: boolean }) => void) => {
        const roomCode = socket.data.roomCode;
        if (!roomCode) {
          callback({ success: false });
          return;
        }

        const accepted = submitAnswer(roomCode, socket.id, answer);
        callback({ success: accepted });

        if (accepted) {
          // Send updated answer count to the host only
          const session = getSession(roomCode);
          if (session) {
            io.to(session.hostSocketId).emit(
              'answer-count',
              getAnswerCount(roomCode),
            );
          }
        }
      },
    );

    // ─── Host: Reveal results for current question ───
    socket.on('reveal-results', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) return;

      const results = revealResults(roomCode, socket.id);
      if (!results) return;

      console.log(`Results revealed in ${roomCode}`);

      // Send leaderboard + correct answer to host
      io.to(socket.id).emit('question-results', {
        correctAnswer: results.correctAnswer,
        leaderboard: results.leaderboard,
      });

      // Send per-player result to each student (did they get it right?)
      for (const [playerSocketId, wasCorrect] of Object.entries(
        results.playerResults,
      )) {
        io.to(playerSocketId).emit('your-result', {
          correctAnswer: results.correctAnswer,
          wasCorrect,
        });
      }

      // Players who didn't answer also get the correct answer
      const session = getSession(roomCode);
      if (session) {
        for (const [playerSocketId] of session.players) {
          if (!(playerSocketId in results.playerResults)) {
            io.to(playerSocketId).emit('your-result', {
              correctAnswer: results.correctAnswer,
              wasCorrect: false,
            });
          }
        }
      }
    });

    // ─── Host: Advance to next question ───
    socket.on('next-question', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) return;

      const result = nextQuestion(roomCode, socket.id);
      if (!result) return;

      if (result === 'question') {
        const question = getCurrentQuestion(roomCode);
        if (question) {
          console.log(
            `Next question in ${roomCode}: ${question.questionIndex + 1}/${question.totalQuestions}`,
          );
          io.to(roomCode).emit('show-question', question);
        }
      } else if (result === 'finished') {
        const leaderboard = getFinalLeaderboard(roomCode);
        console.log(`Quiz finished in ${roomCode}`);
        io.to(roomCode).emit('quiz-finished', { leaderboard });
      }
    });

    // ─── Disconnect handling ───
    socket.on('disconnect', () => {
      const roomCode = socket.data.roomCode;
      const role = socket.data.role;

      console.log(`Client disconnected: ${socket.id} (${role || 'unknown'})`);

      if (!roomCode) return;

      if (role === 'host') {
        // Host left — end the session, notify all players
        io.to(roomCode).emit('session-ended', { reason: 'Host disconnected' });
        deleteSession(roomCode);
        console.log(`Session ${roomCode} deleted (host left)`);
      } else if (role === 'player') {
        removePlayer(roomCode, socket.id);
        io.to(roomCode).emit('player-count', {
          count: getPlayerCount(roomCode),
        });
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
