'use client';

import { useSocket } from '@/hooks/use-socket';
import { EventName } from '@/models/enums/event-name';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PlayerCounter() {
  const { socket } = useSocket();
  const [playerCount, setPlayerCount] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    if (!socket) return;

    const playerCountHandler = (data: { count: number }) =>
      setPlayerCount(data.count);

    socket.on(EventName.PlayerCount, playerCountHandler);

    return () => {
      socket.off(EventName.PlayerCount, playerCountHandler);
    };
  }, [socket]);

  return (
    <p className='opacity-75'>{t('host-waiting-room.player-count', { count: playerCount })}</p>
  );
}
