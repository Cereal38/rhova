'use client';

import { useRouter } from 'next/navigation';
import { useSocket } from './use-socket';
import { useEffect } from 'react';
import WsCallback from '@/models/ws-callback';

export function useHostRejoin(roomCode: string) {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      const hostToken = localStorage.getItem('hostToken');
      if (!hostToken) return;

      socket.emit('rejoin-session', roomCode, hostToken, (res: WsCallback) => {
        if (!res.success) {
          console.error(
            `Can't join the session with roomCode ${roomCode}. Maybe the session expired.`,
          );
          router.push('/');
          return;
        }

        // TODO: Redirect to the correct page using res.phase
      });
    };

    socket.on('connect', onConnect);
    return () => {
      socket.off('connect', onConnect);
    };
  }, [socket, roomCode, router]);
}
