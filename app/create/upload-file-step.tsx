'use client';

import FileDropZone from '@/components/file-drop-zone';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { routes } from '@/lib/routes';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
}

export default function UploadFileStep({ onStepChange }: Readonly<Props>) {
  const t = useTranslations();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl'>{t('create-quiz.upload-file-title')}</h1>
      <Field>
        <FieldDescription>
          {t.rich('create-quiz.upload-file-description', {
            link: (chunks) => <Link href={routes.create()}>{chunks}</Link>,
          })}
        </FieldDescription>
        <FileDropZone
          ref={fileInputRef}
          id='quiz'
          label={t('start-quiz.dropzone-hint')}
          file={fileInput}
          onFileChange={setFileInput}
          accept='.rhova'
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
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
