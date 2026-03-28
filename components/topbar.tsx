import Link from 'next/link';
import ClickableLogo from './clickable-logo';
import { Button } from './ui/button';
import { TopbarItem } from '@/models/interfaces/topbar-item';

interface Props {
  items: TopbarItem[];
}

export default function Topbar({ items }: Readonly<Props>) {
  return (
    <header className='z-30 absolute flex min-w-0 items-center justify-between gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4 h-(--topbar-height) w-full max-w-full backdrop-blur-3xl border-b border-white/5'>
      <ClickableLogo />
      <nav
        aria-label='Main'
        className='flex min-w-0 shrink items-center justify-end gap-1 sm:gap-2 md:gap-4'
      >
        {items.map((item) => (
          <Button
            key={item.label}
            asChild
            variant={item.variant}
            size='sm'
            className='h-8 px-2 font-bold text-xs text-white sm:px-3 sm:text-sm'
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
