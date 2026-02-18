'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function QrCodeSection() {
  const { roomCode } = useParams();

  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className='text-xl'>Scan the QR Code</h2>
      <QRCodeSVG value={`http://localhost:3000/join/${roomCode}`} />
    </div>
  );
}
