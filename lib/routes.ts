export const routes = {
  home: () => '/',
  quizSettingsStart: () => '/quiz-settings/start',
  quizSettingsCreate: () => '/quiz-settings/create',
  hostWaitingRoom: (roomCode: string) => `/quiz/${roomCode}/host-waiting-room`,
  playerWaitingRoom: (roomCode: string) =>
    `/quiz/${roomCode}/player-waiting-room`,
  hostQuestion: (roomCode: string) => `/quiz/${roomCode}/host-question`,
  playerQuestion: (roomCode: string) => `/quiz/${roomCode}/player-question`,
};
