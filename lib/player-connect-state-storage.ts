import { WsPlayerConnect } from '@/models/interfaces/ws-player-connect';

function getPlayerConnectStateKey(roomCode: string) {
  return `player-connect-state:${roomCode}`;
}

export function savePlayerConnectState(
  roomCode: string,
  state: WsPlayerConnect,
) {
  sessionStorage.setItem(
    getPlayerConnectStateKey(roomCode),
    JSON.stringify(state),
  );
}

export function readPlayerConnectState(roomCode: string) {
  const rawState = sessionStorage.getItem(getPlayerConnectStateKey(roomCode));

  if (!rawState) {
    return null;
  }

  try {
    return JSON.parse(rawState) as WsPlayerConnect;
  } catch {
    sessionStorage.removeItem(getPlayerConnectStateKey(roomCode));
    return null;
  }
}

export function clearPlayerConnectState(roomCode: string) {
  sessionStorage.removeItem(getPlayerConnectStateKey(roomCode));
}
