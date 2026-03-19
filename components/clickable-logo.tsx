import { routes } from '@/lib/routes';
import Link from 'next/link';

export default function ClickableLogo() {
  return (
    <Link href={routes.home()} className='text-white font-bold'>
      Rhova
    </Link>
  );
}
