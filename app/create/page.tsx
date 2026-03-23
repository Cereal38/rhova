import { Card } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export default async function CreateQuiz() {
  const t = await getTranslations();

  return (
    <main className='flex-1 flex items-center justify-center max-w-[600px] m-auto '>
      <Card className='flex flex-col gap-2 p-8 md:min-w-[400px]'>
        <h1 id='create-quiz-title' className='text-xl'>
          {t('create-quiz.title')}
        </h1>
      </Card>
    </main>
  );
}
