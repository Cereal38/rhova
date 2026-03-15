import { getTranslations } from 'next-intl/server';

export default async function RoomNotFoundPage() {
  const t = await getTranslations();

  return (
    <main>
      <h1>{t('not-found.room-not-found')}</h1>
    </main>
  );
}
