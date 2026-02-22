import ClickableLogo from '@/components/clickable-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HostQuizTopbar() {
  return (
    <header className='z-30 flex items-center justify-between gap-8 px-4 h-12 w-full backdrop-brightness-250'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href='/quiz-settings/start'>Start a quiz</Link>
        </Button>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href='/quiz-settings/create'>Create a quiz</Link>
        </Button>
        <Button className='font-bold ml-4 h-8'>
          <Link href='/'>Join</Link>
        </Button>
      </div>
    </header>
  );
}
