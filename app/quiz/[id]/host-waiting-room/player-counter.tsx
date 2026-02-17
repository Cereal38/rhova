'use client';

import { useSocket } from '@/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function PlayerCounter() {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('player-count', (data) => setPlayerCount(data.count));

    return () => {
      socket.off('player-count', (data) => setPlayerCount(data.count));
    };
  }, [socket]);

  const [playerCount, setPlayerCount] = useState(0);

  return <p>{playerCount} players ready!</p>;
}
