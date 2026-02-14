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

export default function CreateQuizForm() {
  const [actionState, formAction] = useActionState(createQuiz, null);

  return (
    <Form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='title'>Quiz title</FieldLabel>
          <FieldDescription>What your quiz will be about?</FieldDescription>
          <Input id='title' name='title' autoComplete='off' />
        </Field>
      </FieldGroup>
    </Form>
  );
}
