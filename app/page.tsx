import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#78FFD6] font-sans'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8'>
        <h1
          className={`${caveat.className} text-7xl md:text-8xl leading-none tracking-tight`}
        >
          Rhova
        </h1>
        <Card className='px-8'>
          <Input />
          <Button>Enter</Button>
        </Card>
      </main>
    </div>
  );
}
