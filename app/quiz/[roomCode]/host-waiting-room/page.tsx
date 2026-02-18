import { Card } from '@/components/ui/card';
import PlayerCounter from './player-counter';
import RoomCodeSection from './room-code-section';
import QrCodeSection from './qr-code-section';

export default function HostWaitingRoomPage() {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden font-sans'>
      <object
        data='/room-code-bg.svg'
        type='image/svg+xml'
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <main className='flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4'>
        <Card className='p-16 flex flex-col items-center gap-8'>
          <div className=' flex flex-col items-center'>
            <h1 className='text-3xl'>Rhova.io</h1>
            <PlayerCounter />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <QrCodeSection />
            <div className='flex flex-col items-center gap-4'>
              <div className='flex-1 w-[2px] bg-black'></div>
              <span>OR</span>
              <div className='flex-1 w-[2px] bg-black'></div>
            </div>
            <RoomCodeSection />
          </div>
        </Card>
      </main>
    </div>
  );
}
