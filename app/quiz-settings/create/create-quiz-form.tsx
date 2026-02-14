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
    <Form action={formAction} className='flex flex-col gap-8'>
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
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='question-X'>Question X</FieldLabel>
          <FieldDescription>
            This is the question which will be displayed on the screen
          </FieldDescription>
          <Input
            id='question-X'
            name='question-X'
            autoCapitalize='off'
            placeholder='Molecular formula of carbon dioxide'
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='correct-answer-X'>Correct answer</FieldLabel>
          <FieldDescription>
            This is the correct answer to the question
          </FieldDescription>
          <Input
            id='correct-answer-X'
            name='correct-answer-X'
            autoCapitalize='off'
            placeholder='CO2'
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='wrong-answer-X-1'>Wrong answer 1</FieldLabel>
          <FieldDescription>
            This is a wrong answer to the question
          </FieldDescription>
          <Input
            id='wrong-answer-X-1'
            name='wrong-answer-X-1'
            autoCapitalize='off'
            placeholder='O2'
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='wrong-answer-X-2'>Wrong answer 2</FieldLabel>
          <FieldDescription>
            This is a wrong answer to the question
          </FieldDescription>
          <Input
            id='wrong-answer-X-2'
            name='wrong-answer-X-2'
            autoCapitalize='off'
            placeholder='H2O'
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='wrong-answer-X-3'>Wrong answer 3</FieldLabel>
          <FieldDescription>
            This is a wrong answer to the question
          </FieldDescription>
          <Input
            id='wrong-answer-X-3'
            name='wrong-answer-X-3'
            autoCapitalize='off'
            placeholder='C2O'
          />
        </Field>
      </FieldGroup>
    </Form>
  );
}
