import ClickableLogo from '@/components/clickable-logo';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import Link from 'next/link';

export default function HostWaitingRoomTopbar() {
  return (
    <header className='z-30 flex items-center justify-between gap-8 px-4 h-12 w-full backdrop-brightness-250'>
      <span className=''>
        <ClickableLogo />
      </span>
      <div className='flex'>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href={routes.quizSettingsStart()}>Start a quiz</Link>
        </Button>
        <Button variant='ghost' className='font-bold h-8'>
          <Link href={routes.quizSettingsCreate()}>Create a quiz</Link>
        </Button>
        <Button className='font-bold ml-4 h-8'>
          <Link href={routes.home()}>Join</Link>
        </Button>
      </div>
    </header>
  );
}
