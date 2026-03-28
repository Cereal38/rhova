'use client';
import { useSyncExternalStore } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function RoomCodeSection() {
  const { roomCode } = useParams();
  const t = useTranslations();

  // Prevents hydration mismatch between server and client
  const host = useSyncExternalStore(
    () => () => {},
    () => window.location.host,
    () => '',
  );

  return (
    <div className='flex h-full flex-col items-center gap-8 text-wrap px-4 md:px-16'>
      <h2 className='text-xl'>
        {t.rich('host-waiting-room.room-code-instructions', {
          strong: (chunks) => <strong>{chunks}</strong>,
          url: host,
        })}
      </h2>
      <div className='flex-1 flex items-center'>
        <span className='text-5xl font-bold'>{roomCode}</span>
      </div>
    </div>
  );
}
