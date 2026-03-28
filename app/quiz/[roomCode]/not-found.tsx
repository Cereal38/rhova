import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function RoomNotFoundPage() {
  const t = await getTranslations();

  return (
    <main>
      <h1>{t('not-found.room-not-found')}</h1>
      <Button asChild>
        <Link href={routes.home()}>{t('common.home')}</Link>
      </Button>
    </main>
  );
}
