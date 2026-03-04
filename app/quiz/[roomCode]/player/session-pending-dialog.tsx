'use client';

import { Dialog } from '@/components/ui/dialog';
import { useSocket } from '@/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function SessionPendingDialog() {
  const { socket } = useSocket();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const sessionPendingHandler = () => {
      setOpen(true);
    };

    socket.on('session-pending', sessionPendingHandler);
    return () => {
      socket.off('session-pending', sessionPendingHandler);
    };
  }, [socket]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span>Host is currently offline, wait him to reconnect...</span>
    </Dialog>
  );
}
