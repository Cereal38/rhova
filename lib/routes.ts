export const routes = {
  home: () => '/',
  quizSettingsStart: () => '/quiz-settings/start',
  quizSettingsCreate: () => '/quiz-settings/create',
  hostWaitingRoom: (roomCode: string) => `/quiz/${roomCode}/host-waiting-room`,
  playerWaitingRoom: (roomCode: string) =>
    `/quiz/${roomCode}/player-waiting-room`,
  questionHost: (roomCode: string) => `/quiz/${roomCode}/question-host`,
};
