'use client';

import Quiz from '@/models/interfaces/quiz';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

interface Props {
  errors: any; // TODO: Type this correctly
  quizInput: Quiz;
  onQuizInputChange: (quizInput: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateQuizFieldGroup({
  errors,
  quizInput,
  onQuizInputChange,
}: Props) {
  const t = useTranslations();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor='title'>{t('create-quiz.quiz-title-label')}</FieldLabel>
        <FieldDescription>{t('create-quiz.quiz-title-description')}</FieldDescription>
        <Input
          id='title'
          name='title'
          autoComplete='off'
          placeholder={t('create-quiz.quiz-title-placeholder')}
          aria-invalid={!!errors?.title}
          value={quizInput.title}
          onChange={onQuizInputChange}
        />
        {!!errors?.title && <FieldError>{errors.title}</FieldError>}
      </Field>
    </FieldGroup>
  );
}
