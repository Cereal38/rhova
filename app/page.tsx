import { Card } from '@/components/ui/card';
import RoomCodeForm from './room-code-form';
import RoomCodeTopbar from '@/app/room-code-topbar';

export default function RoomCodePage() {
  return (
    <>
      <RoomCodeTopbar />
      <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
        <object
          data='/room-code-bg.svg'
          type='image/svg+xml'
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <main className='flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
          <Card className='p-8'>
            <h1 className='font-bold text-7xl md:text-8xl'>Rhova</h1>
            <RoomCodeForm />
          </Card>
        </main>
      </div>
    </>
  );
}
