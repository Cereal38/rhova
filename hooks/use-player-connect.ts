'use client';

import { useRouter } from 'next/navigation';
import { useSocket } from './use-socket';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WsCallback from '@/models/interfaces/ws-callback';
import { EventName } from '@/models/enums/event-name';

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
        (res: WsCallback) => {
          if (!res.success) {
            console.error(
              `Can't connect to session ${roomCode}. ${res.error}.`,
            );
            router.push('/');
            return;
          }

          // TODO: Redirect to the correct page using res.phase
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
