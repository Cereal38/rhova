'use client';

import { useSyncExternalStore } from 'react';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslations } from 'next-intl';

export default function QrCodeSection() {
  const { roomCode } = useParams();
  const t = useTranslations();
  // Prevents hydration mismatch between server and client
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => '',
  );

  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='text-xl'>{t('host-waiting-room.scan-qr-code')}</h2>
      {origin && (
        <QRCodeSVG
          size={200}
          value={`${origin}/quiz/${roomCode}/player/waiting-room`}
        />
      )}
    </div>
  );
}
