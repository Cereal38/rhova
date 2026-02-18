'use client';

import { useParams } from 'next/navigation';

export default function RoomCodeSection() {
  const { id } = useParams();

  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='text-xl'>Go to Rhova.io and enter the room code</h2>
      <span className='text-3xl font-bold'>{id}</span>
    </div>
  );
}
