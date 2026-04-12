import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <main className='flex-1 flex items-center justify-center w-full m-auto px-4'>
      <Card className='flex flex-col gap-2 p-8 min-w-[90%] md:min-w-[600px]'>
        <CardHeader>
          <CardTitle>{t('common.contact')}</CardTitle>
          <CardDescription>{t('contact.description')}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 mt-4'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xs font-medium text-muted-foreground uppercase'>
              {t('contact.contact-email')}
            </h2>
            <Link
              href='mailto:contact@rhova.app'
              className='text-sm underline underline-offset-4 hover:opacity-75'
            >
              contact@rhova.app
            </Link>
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xs font-medium text-muted-foreground uppercase'>
              {t('contact.creator-github-profile')}
            </h2>
            <Link
              href='https://github.com/Cereal38'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm underline underline-offset-4 hover:opacity-75'
            >
              github.com/Cereal38
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
