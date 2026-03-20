'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function RoomCodeSection() {
  const { roomCode } = useParams();
  const t = useTranslations();

  return (
    <div className='flex flex-col items-center gap-8 h-full text-wrap px-16'>
      <h2 className='text-xl'>
        {t.rich('host-waiting-room.room-code-instructions', {
          strong: (chunks) => <strong>{chunks}</strong>,
          url: window.location.host,
        })}
      </h2>
      <div className='flex-1 flex items-center'>
        <span className='text-5xl font-bold'>{roomCode}</span>
      </div>
    </div>
  );
}
