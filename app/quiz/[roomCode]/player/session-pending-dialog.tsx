'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSocket } from '@/hooks/use-socket';
import { EventName } from '@/models/enums/event-name';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SessionPendingDialog() {
  const { socket } = useSocket();
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const sessionPendingHandler = () => {
      setOpen(true);
    };

    const sessionResumeHandler = () => {
      setOpen(false);
    };

    socket.on(EventName.SessionPending, sessionPendingHandler);
    socket.on(EventName.SessionResume, sessionResumeHandler);
    return () => {
      socket.off(EventName.SessionPending, sessionPendingHandler);
      socket.off(EventName.SessionResume, sessionResumeHandler);
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
          <DialogTitle>{t('session-pending.title')}</DialogTitle>
          <DialogDescription>{t('session-pending.description')}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
