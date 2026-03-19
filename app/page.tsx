import { Card } from '@/components/ui/card';
import RoomCodeForm from './room-code-form';
import RoomCodeTopbar from '@/app/room-code-topbar';
import GradientBackground from '@/components/gradient-background';

export default function RoomCodePage() {
  return (
    <>
      <RoomCodeTopbar />
      <div className='relative flex min-h-dvh items-center justify-center overflow-hidden font-sans'>
        <GradientBackground />
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
