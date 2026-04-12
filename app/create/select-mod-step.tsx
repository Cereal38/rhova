'use client';

import { Button } from '@/components/ui/button';
import { FilePenLine, FilePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onCreateQuiz: () => void;
  onEditQuiz: () => void;
}

export default function SelectModStep({
  onCreateQuiz,
  onEditQuiz,
}: Readonly<Props>) {
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl'>{t('create-quiz.title')}</h1>
      <div className='flex gap-4'>
        <Button
          variant='outline'
          className='flex-1 flex-col h-auto py-8 gap-3 text-primary cursor-pointer'
          onClick={onCreateQuiz}
        >
          <span>{t('create-quiz.new-quiz')}</span>
          <FilePlus className='size-10' />
        </Button>
        <Button
          variant='outline'
          className='flex-1 flex-col h-auto py-8 gap-3 text-primary cursor-pointer'
          onClick={onEditQuiz}
        >
          <span>{t('create-quiz.edit-quiz')}</span>
          <FilePenLine className='size-10' />
        </Button>
      </div>{' '}
    </div>
  );
}
