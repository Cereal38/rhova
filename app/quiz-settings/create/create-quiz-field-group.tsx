'use client';

import QuizInput from '@/app/models/quiz-input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface Props {
  errors: any; // TODO: Type this correctly
  quizInput: QuizInput;
  onQuizInputChange: (quizInput: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateQuizFieldGroup({
  errors,
  quizInput,
  onQuizInputChange,
}: Props) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor='title'>Quiz title</FieldLabel>
        <FieldDescription>What your quiz will be about?</FieldDescription>
        <Input
          id='title'
          name='title'
          autoComplete='off'
          placeholder='Chemistry terminology'
          aria-invalid={!!errors?.title}
          value={quizInput.title}
          onChange={onQuizInputChange}
        />
        {!!errors?.title && <FieldError>{errors.title}</FieldError>}
      </Field>
    </FieldGroup>
  );
}
