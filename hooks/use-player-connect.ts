'use client';

import { useRouter } from 'next/navigation';
import { useSocket } from './use-socket';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WsCallback from '@/models/interfaces/ws-callback';
import { EventName } from '@/models/enums/event-name';
import { SessionPhase } from '@/models/enums/session-phase';
import { routes } from '@/lib/routes';
import { WsPlayerConnect } from '@/models/interfaces/ws-player-connect';
import { savePlayerConnectState } from '@/lib/player-connect-state-storage';

export function usePlayerConnect(roomCode: string) {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      let playerToken = localStorage.getItem('playerToken');
      if (!playerToken) {
        playerToken = uuidv4();
        localStorage.setItem('playerToken', playerToken);
      }

      socket.emit(
        EventName.PlayerConnect,
        roomCode,
        playerToken,
        (res: WsCallback<WsPlayerConnect>) => {
          if (!res.success) {
            console.error(
              `Can't connect to session ${roomCode}. ${res.error}.`,
            );
            router.push('/');
            return;
          }

          const shouldRestorePlayerPage =
            res.payload?.phase === SessionPhase.Question ||
            res.payload?.phase === SessionPhase.Result ||
            res.payload?.phase === SessionPhase.Finished;

          if (res.payload && shouldRestorePlayerPage) {
            savePlayerConnectState(roomCode, res.payload);
          }

          if (shouldRestorePlayerPage) {
            router.replace(routes.playerQuestion(roomCode));
          }
        },
      );
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on('connect', onConnect);
    return () => {
      socket.off('connect', onConnect);
    };
  }, [socket, roomCode, router]);
}
