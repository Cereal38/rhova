import Link from 'next/link';
import ClickableLogo from './clickable-logo';
import { Button } from './ui/button';
import { TopbarItem } from '@/models/interfaces/topbar-item';

interface Props {
  items: TopbarItem[];
}

export default function Topbar({ items }: Props) {
  return (
    <header className='z-30 absolute flex items-center justify-between gap-8 px-4 py-4 w-full backdrop-blur-3xl border-b border-white/5'>
      <ClickableLogo />
      <div className='flex gap-4'>
        {items.map((item) => (
          <Button key={item.label} asChild className='font-bold h-8 ml-4'>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </header>
  );
}
