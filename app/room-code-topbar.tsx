import ClickableLogo from '@/components/clickable-logo';
import { Button } from '../components/ui/button';
import Link from 'next/link';

// TODO: Try to do only 1 dynamic topbar for the whole project
export default function RoomCodeTopbar() {
  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 h-12 w-full bg-white'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button asChild variant='ghost' className='font-bold h-8'>
          <Link href='/quiz-settings/start'>Start a quiz</Link>
        </Button>
        <Button asChild className='font-bold h-8 ml-4'>
          <Link href='/quiz-settings/create'>Create a quiz</Link>
        </Button>
      </div>
    </header>
  );
}
