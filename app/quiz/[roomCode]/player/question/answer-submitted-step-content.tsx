import CustomLoader from '@/components/custom-spinner';
import { useTranslations } from 'next-intl';

export default function AnswerSubmittedStepContent() {
  const t = useTranslations();

  return (
    <main className='h-full flex flex-col p-8 text-white'>
      <div className='flex-1 flex flex-col gap-12 items-center justify-center'>
        <CustomLoader size={16} />
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-4xl font-bold text-center'>
            {t('player-question.answer-submitted')}
          </h2>
          <span className='text-center'>
            {t('player-question.answer-registered')}
          </span>
        </div>
      </div>
    </main>
  );
}
