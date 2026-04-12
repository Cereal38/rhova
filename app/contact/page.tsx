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
        <CardContent className='flex flex-col gap-4 mt-4'>
          <div>
            <h2 className='font-semibold'>{t('contact.contact-email')}</h2>
            <Link
              href='mailto:contact@rhova.app'
              className='text-primary hover:underline'
            >
              contact@rhova.app
            </Link>
          </div>
          <div>
            <h2 className='font-semibold'>{t('contact.project-repository')}</h2>
            <Link
              href='https://github.com/Cereal38/rhova'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              github.com/Cereal38/rhova
            </Link>
          </div>
          <div>
            <h2 className='font-semibold'>{t('contact.github-issue')}</h2>
            <Link
              href='https://github.com/Cereal38/rhova/issues'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              github.com/Cereal38/rhova/issues
            </Link>
          </div>
          <div>
            <h2 className='font-semibold'>{t('contact.creator-github-profile')}</h2>
            <Link
              href='https://github.com/Cereal38'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              github.com/Cereal38
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
