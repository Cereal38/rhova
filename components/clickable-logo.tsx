import { routes } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function ClickableLogo() {
  return (
    <Link
      href={routes.home()}
      className='text-white font-bold flex items-center gap-4'
    >
      <Image
        src='/logo.svg'
        alt=''
        width={24}
        height={24}
        className='brightness-0 invert'
      />
      Rhova
    </Link>
  );
}
