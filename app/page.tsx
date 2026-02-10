import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8'>
        <Card className='bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-8'>
          <h1 className='text-white font-bold text-7xl md:text-8xl leading-none tracking-tight'>
            Rhova
          </h1>
          <Input />
          <Button>Enter</Button>
        </Card>
      </main>
    </div>
  );
}
