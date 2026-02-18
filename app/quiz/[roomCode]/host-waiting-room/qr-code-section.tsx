'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function QrCodeSection() {
  const { roomCode } = useParams();

  return (
    <div>
      <QRCodeSVG value='google.com' />
    </div>
  );
}
