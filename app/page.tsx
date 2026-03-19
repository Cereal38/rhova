import { Card } from '@/components/ui/card';
import RoomCodeForm from './room-code-form';
import RoomCodeTopbar from '@/app/room-code-topbar';

export default function RoomCodePage() {
  return (
    <>
      <RoomCodeTopbar />
      <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(110,168,255,0.4),transparent_40%),radial-gradient(circle_at_20%_70%,rgba(255,110,199,0.25),transparent_50%),linear-gradient(135deg,#2b2f77,#1c1f4a)]'
        />
        <main className='flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-8 px-4'>
          <Card className='flex flex-col gap-8 p-8 md:min-w-[400px]'>
            <h1 className='font-bold text-center text-6xl md:text-7xl'>
              Rhova
            </h1>
            <RoomCodeForm />
          </Card>
        </main>
      </div>
    </>
  );
}
