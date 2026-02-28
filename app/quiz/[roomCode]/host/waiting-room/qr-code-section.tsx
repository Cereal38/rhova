'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function QrCodeSection() {
  const { roomCode } = useParams();

  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='text-xl'>Scan the QR Code</h2>
      <QRCodeSVG
        size={200}
        value={`http://192.168.1.113:3000/quiz/${roomCode}/player/waiting-room`}
      />
    </div>
  );
}
