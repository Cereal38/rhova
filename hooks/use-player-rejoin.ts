'use client';

import { useRouter } from 'next/navigation';
import { useSocket } from './use-socket';
import { useEffect } from 'react';
import WsCallback from '@/models/ws-callback';

export function usePlayerRejoin(roomCode: string) {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      const playerToken = localStorage.getItem('playerToken');
      if (!playerToken) return;

      socket.emit(
        'player-rejoin-session',
        roomCode,
        playerToken,
        (res: WsCallback) => {
          if (!res.success) {
            console.error(
              `Can't join the session with roomCode ${roomCode}. Maybe the session expired.`,
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
