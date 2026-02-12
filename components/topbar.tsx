import { MoveRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Topbar() {
  return (
    <header className='absolute flex items-center justify-between gap-8 px-4 h-12 w-full backdrop-brightness-75 border-b'>
      <span className='text-white'>Rhova</span>
      <div className='flex gap-2'>
        <Button
          variant='ghost'
          className='text-white font-bold cursor-pointer h-8'
        >
          Start a quiz
        </Button>
        <Button className='bg-white text-black font-bold cursor-pointer h-8'>
          Create a quiz
        </Button>
      </div>
    </header>
  );
}
