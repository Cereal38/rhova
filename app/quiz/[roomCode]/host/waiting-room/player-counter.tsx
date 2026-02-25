'use client';

import { useSocket } from '@/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function PlayerCounter() {
  const { socket } = useSocket();
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    if (!socket) return;

    const playerCountHandler = (data: { count: number }) =>
      setPlayerCount(data.count);

    socket.on('player-count', playerCountHandler);

    return () => {
      socket.off('player-count', playerCountHandler);
    };
  }, [socket]);

  return <p className='opacity-75'>{playerCount} players ready!</p>;
}
