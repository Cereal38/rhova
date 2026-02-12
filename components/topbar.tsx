import { MoveRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Topbar() {
  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 h-12 w-full backdrop-brightness-250'>
      <span className=''>Rhova</span>
      <div className='flex gap-2'>
        <Button variant='ghost' className='font-bold cursor-pointer h-8'>
          Start a quiz
        </Button>
        <Button className='font-bold cursor-pointer h-8'>Create a quiz</Button>
      </div>
    </header>
  );
}
