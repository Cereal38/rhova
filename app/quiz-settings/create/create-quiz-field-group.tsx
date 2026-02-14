'use client';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createQuiz } from '@/lib/actions/create-quiz-actions';
import Form from 'next/form';
import { useActionState } from 'react';

export default function CreateQuizFieldGroup() {
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
        />
      </Field>
    </FieldGroup>
  );
}
