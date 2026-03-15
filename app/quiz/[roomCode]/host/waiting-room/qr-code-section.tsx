'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslations } from 'next-intl';

export default function QrCodeSection() {
  const { roomCode } = useParams();
  const t = useTranslations();

  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='text-xl'>{t('host-waiting-room.scan-qr-code')}</h2>
      <QRCodeSVG
        size={200}
        value={`${window.location.origin}/quiz/${roomCode}/player/waiting-room`}
      />
    </div>
  );
}
