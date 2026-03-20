'use client';

import Topbar from '@/components/topbar';
import { useHostRejoin } from '@/hooks/use-host-rejoin';
import { routes } from '@/lib/routes';
import { TopbarItem } from '@/models/interfaces/topbar-item';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function QuizHostLayoutClient({ children }: Props) {
  const { roomCode } = useParams<{ roomCode: string }>();
  useHostRejoin(roomCode);

  const t = useTranslations();

  const items: TopbarItem[] = [
    {
      label: t('common.start-a-quiz'),
      href: routes.start(),
      variant: 'ghost',
    },
    {
      label: t('common.join'),
      href: routes.home(),
    },
  ];

  return <div className='flex flex-col h-dvh'>{children}</div>;
}
