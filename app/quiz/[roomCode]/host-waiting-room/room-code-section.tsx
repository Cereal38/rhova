'use client';

import { useParams } from 'next/navigation';

export default function RoomCodeSection() {
  const { roomCode } = useParams();

  return (
    <div className='flex flex-col items-center gap-8 h-full text-wrap px-16'>
      <h2 className='text-xl'>
        Go to <strong>Rhova.io</strong> and enter the room code
      </h2>
      <div className='flex-1 flex items-center'>
        <span className='text-3xl font-bold'>{roomCode}</span>
      </div>
    </div>
  );
}
