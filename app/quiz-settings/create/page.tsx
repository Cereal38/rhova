'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateQuizFieldGroup from './create-quiz-field-group';
import { useActionState } from 'react';
import { createQuiz } from '@/lib/actions/create-quiz-actions';
import Form from 'next/form';
import AddQuestionFieldGroup from './add-question-field-group';

export default function CreateQuizPage() {
  const [actionState, formAction] = useActionState(createQuiz, null);
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Create a quiz</CardTitle>
          <CardDescription>
            Fill the form below to create your quiz. You will then be able to
            play it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction} className='flex flex-col gap-8'>
            <CreateQuizFieldGroup />
            <AddQuestionFieldGroup />
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
