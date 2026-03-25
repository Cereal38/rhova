'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
}

export default function SetTitleStep({ onStepChange }: Readonly<Props>) {
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{t('create-quiz.set-title-title')}</h1>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t('create-quiz.set-title-description')}
        </p>
      </div>
      <Input
        autoFocus
        placeholder={t('create-quiz.set-title-placeholder')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onStepChange(CreateQuizStep.SelectMod);
        }}
      />
      <Button
        type='button'
        className='w-fit self-end cursor-pointer'
        aria-label={t('common.next')}
        onClick={() => onStepChange(CreateQuizStep.SelectMod)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
