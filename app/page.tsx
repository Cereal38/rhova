'use client';

import { Card } from '@/components/ui/card';
import RoomCodeForm from './room-code-form';

export default function Home() {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden font-sans'>
      {/* Animated SVG background */}
      <object
        data='/room-code-bg.svg'
        type='image/svg+xml'
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
        <Card className='p-8'>
          <h1 className='font-bold text-7xl md:text-8xl'>Rhova</h1>
          <RoomCodeForm />
        </Card>
      </main>
    </div>
  );
}
