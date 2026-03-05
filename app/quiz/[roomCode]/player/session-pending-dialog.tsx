'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Host Disconnected</DialogTitle>
          <DialogDescription>
            Host is currently offline, wait for him to reconnect...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
