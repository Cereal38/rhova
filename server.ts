import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';
import {
  createSession,
  getSession,
  deleteSession,
  addPlayer,
  getPlayerCount,
  startQuiz,
  getCurrentQuestion,
  submitAnswer,
  getAnswerCount,
  revealResults,
  nextQuestion,
  getFinalLeaderboard,
  addPendingDisconnectSession,
  getPendingDisconnectSession,
  deletePendingDisconnectSession,
} from './server/session-manager';
import type Quiz from '@/models/interfaces/quiz';
import WsCallback from './models/interfaces/ws-callback';
import WsQuestion from './models/interfaces/ws-question';
import WsQuestionResult from './models/interfaces/ws-question-result';
import WsNextQuestion from './models/interfaces/ws-next-question';
import { Player } from './server/types';
import { UserRole } from './models/enums/user-role';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const sessionTimeoutMs = 5 * 60 * 1000;

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
      (
        quiz: Quiz,
        hostToken: string,
        callback: (res: { roomCode: string }) => void,
      ) => {
        const session = createSession(quiz, socket.id, hostToken);
        socket.join(session.roomCode);
        socket.data.roomCode = session.roomCode;
        socket.data.role = UserRole.host;

        console.log(`Host token: ${session.hostToken}`);
        console.log(`Session created: ${session.roomCode}`);
        callback({ roomCode: session.roomCode });
      },
    );

    // ─── Student: Verify if a room code exists ───
    socket.on(
      'check-code',
      (roomCode: string, callback: (res: WsCallback) => void) => {
        const session = getSession(roomCode);

        if (!session) {
          callback({ success: false, error: 'The room code is invalid' });
          return;
        }

        // TODO: 'lobby' should be provided by an enum
        if (session.phase !== 'lobby') {
          callback({ success: false, error: 'Quiz has already started' });
          return;
        }

        callback({ success: true });
      },
    );

    // ─── Student: Join a session or reconnect ───
    socket.on(
      'player-connect',
      (
        roomCode: string,
        playerToken: string,
        callback: (res: WsCallback) => void,
      ) => {
        const session = getSession(roomCode);

        if (!session) {
          return callback({ success: false, error: 'Session not found' });
        }

        // If the token already belongs to a player in the session, reconnect the user
        let existingKey: string | null = null;
        let existingPlayer: Player | null = null;
        for (const [key, p] of session.players.entries()) {
          if (p.token === playerToken) {
            existingKey = key;
            existingPlayer = p;
            break; // We found the existing player, don't look further
          }
        }

        if (existingPlayer && existingKey) {
          existingPlayer.socketId = socket.id;
          session.players.delete(existingKey);
          session.players.set(socket.id, existingPlayer);

          socket.join(roomCode);
          socket.data.roomCode = roomCode;
          socket.data.role = UserRole.player;

          // Rekey answer if one exists
          const existingAnswer = session.answers.get(existingKey);
          if (existingAnswer !== undefined) {
            session.answers.delete(existingKey);
            session.answers.set(socket.id, existingAnswer);
          }

          console.log(
            `Player ${existingPlayer.playerNumber} rejoined ${roomCode}`,
          );
          // TODO: Should return the current game state, so the user can navigate to the correct page
          return callback({ success: true });
        }

        // This is the first connection of this player to the room
        if (session.phase !== 'lobby') {
          return callback({ success: false, error: 'Could not join session' });
        }

        const player = addPlayer(roomCode, socket.id, playerToken);
        if (!player) {
          return callback({ success: false, error: 'Could not join session' });
        }

        socket.join(roomCode);
        socket.data.roomCode = roomCode;
        socket.data.role = UserRole.player;
        console.log(`Player ${player.playerNumber} joined ${roomCode}`);

        // Notify everyone in the room (including host) of new player count
        io.to(roomCode).emit('player-count', {
          count: getPlayerCount(roomCode),
        });

        return callback({ success: true });
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

    // ─── All: Get the current question ───
    socket.on(
      'get-question',
      (roomCode: string, callback: (res: WsCallback<WsQuestion>) => void) => {
        const question: WsQuestion | null = getCurrentQuestion(roomCode);

        if (!question) {
          callback({
            success: false,
            error:
              'Could not find the question. Is the code valid and the session active?',
          });
          return;
        }

        callback({ success: true, payload: question });
      },
    );

    // ─── All: Get the current number of players in the game ───
    socket.on(
      'get-player-count',
      (roomCode: string, callback: (res: WsCallback<number>) => void) => {
        const count = getPlayerCount(roomCode);

        callback({ success: true, payload: count });
      },
    );

    // ─── Student: Submit an answer ───
    socket.on(
      'submit-answer',
      (
        roomCode: string,
        answer: string,
        callback: (res: WsCallback) => void,
      ) => {
        if (!roomCode) {
          callback({
            success: false,
            error: `Could not find the room with the room code ${roomCode}`,
          });
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
    socket.on(
      'reveal-results',
      (
        roomCode: string,
        callback: (res: WsCallback<WsQuestionResult>) => void,
      ) => {
        if (!roomCode) {
          callback({ success: false, error: 'No roomCode specified' });
          return;
        }

        const results = revealResults(roomCode, socket.id);
        if (!results) {
          callback({
            success: false,
            error: "Can't get results for the current question",
          });
          return;
        }

        console.log(`Results revealed in ${roomCode}`);

        // Send leaderboard + correct answer to host
        io.to(socket.id).emit('question-results', {
          correctAnswer: results.correctAnswer,
          // leaderboard: results.leaderboard,
        });

        // Send per-player result to each student (did they get it right?)
        for (const [playerSocketId, wasCorrect] of Object.entries(
          results.playerResults,
        )) {
          io.to(playerSocketId).emit('player-result', {
            correctAnswer: results.correctAnswer,
            wasCorrect,
          });
        }

        // Players who didn't answer also get the correct answer
        const session = getSession(roomCode);
        if (session) {
          for (const [playerSocketId] of session.players) {
            if (!(playerSocketId in results.playerResults)) {
              io.to(playerSocketId).emit('player-result', {
                correctAnswer: results.correctAnswer,
                wasCorrect: false,
              });
            }
          }
        }

        callback({
          success: true,
          payload: {
            correctAnswer: results.correctAnswer,
            // leaderboard: results.leaderboard,
          },
        });
      },
    );

    // ─── Host: Advance to next question ───
    socket.on(
      'next-question',
      (
        roomCode: string,
        callback: (res: WsCallback<WsNextQuestion>) => void,
      ) => {
        if (!roomCode) {
          callback({ success: false, error: 'No roomCode specified' });
          return;
        }

        const result = nextQuestion(roomCode, socket.id);
        if (!result) {
          callback({
            success: false,
            error: "Can't get results for the current question",
          });
          return;
        }

        if (result === 'question') {
          const question = getCurrentQuestion(roomCode);

          if (!question) {
            callback({
              success: false,
              error: "Can't get the next question",
            });
            return;
          }

          console.log(
            `Next question in ${roomCode}: ${question.questionIndex + 1}/${question.totalQuestions}`,
          );
          io.to(roomCode).emit('show-question', question);
          callback({
            success: true,
            payload: {
              isQuizFinished: false,
              question: question,
              leaderboard: null,
            },
          });
        } else if (result === 'finished') {
          const leaderboard = getFinalLeaderboard(roomCode);
          console.log(`Quiz finished in ${roomCode}`);
          callback({
            success: true,
            payload: {
              isQuizFinished: true,
              question: null,
              leaderboard: leaderboard,
            },
          });

          // Notify all players the quiz is finished and give them their score
          const session = getSession(roomCode);
          if (!session) {
            console.error(
              "An error occurred while notifying players for quiz-finished. Can't get session.",
            );
            return;
          }
          for (const [playerSocketId, player] of session.players) {
            io.to(playerSocketId).emit('quiz-finished', {
              score: player.score,
              total: session.quiz.questions.length,
            });
          }
        }
      },
    );

    // ─── Disconnect handling ───
    socket.on('disconnect', () => {
      const roomCode = socket.data.roomCode;
      const role = socket.data.role;

      console.log(`Client disconnected: ${socket.id} (${role || 'unknown'})`);

      if (!roomCode) return;

      if (role === UserRole.host) {
        // Waiting for the host to reconnect. Kill the session after a certain time
        io.to(roomCode).emit('session-pending');

        const timeout = setTimeout(() => {
          // Host left — end the session, notify all players
          io.to(roomCode).emit('session-ended', {
            reason: 'Host disconnected',
          });
          deleteSession(roomCode);
          console.log(`Session ${roomCode} deleted (host left)`);
        }, sessionTimeoutMs);

        addPendingDisconnectSession(roomCode, timeout);
      }
    });

    // ─── Reconnection handling ───
    socket.on(
      'host-rejoin-session',
      (roomCode: string, hostToken: string, callback) => {
        const session = getSession(roomCode);
        if (!session || session.hostToken !== hostToken) {
          return callback({ success: false, error: 'Invalid session' });
        }

        // Cancel the pending deletion
        const timeout = getPendingDisconnectSession(roomCode);
        if (timeout) {
          clearTimeout(timeout);
          deletePendingDisconnectSession(roomCode);
        }

        // Reassign host identity
        session.hostSocketId = socket.id;
        socket.join(roomCode);
        socket.data.roomCode = roomCode;
        socket.data.role = UserRole.host;

        // Tell players we're back
        io.to(roomCode).emit('session-resume');

        // Return current state so the host can render the right page
        callback({ success: true, phase: session.phase, roomCode });
      },
    );
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
