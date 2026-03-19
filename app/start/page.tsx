import { getTranslations } from 'next-intl/server';
import StartQuizForm from './start-quiz-form';

export default async function StartQuizPage() {
  const t = await getTranslations();

  return (
    <main>
      <h1 className='text-xl'>{t('start-quiz.title')}</h1>
      <StartQuizForm />
    </main>
  );
}
