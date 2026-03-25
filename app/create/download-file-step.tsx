'use client';

import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { routes } from '@/lib/routes';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import Quiz from '@/models/interfaces/quiz';
import { ArrowLeft, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
  quiz: Quiz;
}

export default function DownloadFileStep({
  onStepChange,
  quiz,
}: Readonly<Props>) {
  const t = useTranslations();

  function downloadHandler() {
    const blob = new Blob([JSON.stringify(quiz, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${quiz.title || 'quiz'}.rhova`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{t('create-quiz.download-file-title')}</h1>
        <FieldDescription>
          {t('create-quiz.download-file-description')}
        </FieldDescription>
      </div>
      <Button
        type='button'
        className='w-fit cursor-pointer'
        onClick={downloadHandler}
      >
        <Download />
        {t('create-quiz.download-file-button')}
      </Button>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          className='w-fit cursor-pointer'
          aria-label={t('common.previous')}
          onClick={() => onStepChange(CreateQuizStep.SetQuestions)}
        >
          <ArrowLeft />
        </Button>
        <Button
          asChild
          variant='outline'
          type='button'
          className='cursor-pointer'
          aria-label={t('common.finish')}
        >
          <Link href={routes.home()}>{t('common.finish')}</Link>
        </Button>
      </div>
    </div>
  );
}
