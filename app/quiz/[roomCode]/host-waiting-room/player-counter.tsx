'use client';

import { useSocket } from '@/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function PlayerCounter() {
  const { socket } = useSocket();
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    if (!socket) return;

    socket.on('player-count', (data) => setPlayerCount(data.count));

    return () => {
      socket.off('player-count', (data) => setPlayerCount(data.count));
    };
  }, [socket]);

  return <p className='opacity-75'>{playerCount} players ready!</p>;
}
