'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
}

export default function UploadFileStep({ onStepChange }: Readonly<Props>) {
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{t('create-quiz.set-title-title')}</h1>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t('create-quiz.set-title-description')}
        </p>
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          className='w-fit cursor-pointer'
          aria-label={t('common.previous')}
          onClick={() => onStepChange(CreateQuizStep.SelectMod)}
        >
          <ArrowLeft />
        </Button>
        <Button
          type='button'
          className='w-fit cursor-pointer'
          aria-label={t('common.next')}
          onClick={() => onStepChange(CreateQuizStep.SelectMod)}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
