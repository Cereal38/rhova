'use client';

import FileDropZone from '@/components/file-drop-zone';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { routes } from '@/lib/routes';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import Quiz from '@/models/interfaces/quiz';
import { quizFormatValidator } from '@/validators/quiz-format-validator';
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

  const nextStepHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!fileInput) {
      console.error('No file selected');
      setLoading(false);
      return;
    }

    let text: string;
    try {
      text = await fileInput.text();
    } catch (err) {
      handleError(t('common.error-read-file'));
      setLoading(false);
      console.error(
        'An error occurred while reading the given file. Error: ' + err,
      );
      return;
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(text);
    } catch (err) {
      handleError(t('common.error-invalid-rhova-config'));
      setLoading(false);
      console.error(
        'An error occurred while parsing the given file. Error: ' + err,
      );
      return;
    }

    const quizFormatValidation = quizFormatValidator.safeParse(parsedData);
    if (!quizFormatValidation.success) {
      handleError(t('common.error-invalid-rhova-config'));
      setLoading(false);
      return;
    }

    const quizData: Quiz = quizFormatValidation.data;
  };

  const handleError = (message: string) => {
    setError(message);
    setFileInput(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          label={t('common.dropzone-rhova-hint')}
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
