'use client';

import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
  onTitleChange: (title: string) => void;
  title: string;
}

export default function SetTitleStep({
  onStepChange,
  onTitleChange,
  title,
}: Readonly<Props>) {
  const t = useTranslations();

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onTitleChange(e.target.value);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{t('create-quiz.set-title-title')}</h1>
        <FieldDescription>
          {t('create-quiz.set-title-description')}
        </FieldDescription>
      </div>
      <Input
        autoFocus
        placeholder={t('create-quiz.set-title-placeholder')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onStepChange(CreateQuizStep.SelectMod);
        }}
        onChange={handleTitleChange}
        value={title}
      />
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
