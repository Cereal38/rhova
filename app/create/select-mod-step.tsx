'use client';

import { Button } from '@/components/ui/button';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { FilePenLine, FilePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
}

export default function SelectModStep({ onStepChange }: Readonly<Props>) {
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl'>{t('create-quiz.title')}</h1>
      <div className='flex gap-4'>
        <Button
          variant='outline'
          className='flex-1 flex-col h-auto py-8 gap-3 text-primary cursor-pointer'
          onClick={() => onStepChange(CreateQuizStep.SetTitle)}
        >
          <span>{t('create-quiz.new-quiz')}</span>
          <FilePlus className='size-10' />
        </Button>
        <Button
          variant='outline'
          className='flex-1 flex-col h-auto py-8 gap-3 text-primary cursor-pointer'
          onClick={() => onStepChange(CreateQuizStep.UploadFile)}
        >
          <span>{t('create-quiz.edit-quiz')}</span>
          <FilePenLine className='size-10' />
        </Button>
      </div>{' '}
    </div>
  );
}
