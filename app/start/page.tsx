import { getTranslations } from 'next-intl/server';
import StartQuizForm from './start-quiz-form';
import { Card } from '@/components/ui/card';

export default async function StartQuizPage() {
  const t = await getTranslations();

  return (
    <main className='flex-1 flex items-center justify-center max-w-[600px] m-auto px-4'>
      <Card className='flex flex-col gap-2 p-8 md:min-w-[400px]'>
        <h1 id='start-quiz-title' className='text-xl'>
          {t('start-quiz.title')}
        </h1>
        <StartQuizForm />
      </Card>
    </main>
  );
}
