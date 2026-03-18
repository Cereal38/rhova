'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';

export function useSocket() {
  const [socket] = useState(getSocket());
  const [isConnected, setIsConnected] = useState(() => getSocket().connected);

  useEffect(() => {
    const s = getSocket();

    // Connect if not already connected
    if (!s.connected) {
      s.connect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);

    return () => {
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
    };
  }, []);

  return { socket, isConnected };
}
