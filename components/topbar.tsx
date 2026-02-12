import { MoveRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Topbar() {
  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 h-12 w-full backdrop-brightness-250'>
      <span className=''>
        <Link href='/'>Rhova</Link>
      </span>
      <div className='flex gap-2'>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href='/quiz-settings/start'>Start a quiz</Link>
        </Button>
        <Button className='font-bold h-8'>
          <Link href='/quiz-settings/create'>Create a quiz</Link>
        </Button>
      </div>
    </header>
  );
}
