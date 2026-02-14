'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateQuizFieldGroup from './create-quiz-field-group';
import { useActionState, useState } from 'react';
import { createQuiz } from '@/lib/actions/create-quiz-actions';
import Form from 'next/form';
import AddQuestionFieldGroup from './add-question-field-group';
import { Button } from '@/components/ui/button';

const enum Steps {
  'BASIC_INFO',
  'ADD_QUESTION',
}

export default function CreateQuizPage() {
  const [actionState, formAction] = useActionState(createQuiz, null);
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.BASIC_INFO);

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
          <Form
            id='create-quiz'
            action={formAction}
            className='flex flex-col gap-8'
          >
            <CreateQuizFieldGroup />
            {/* <AddQuestionFieldGroup /> */}
          </Form>
        </CardContent>
        <CardFooter>
          <div className='flex justify-between w-full'>
            {currentStep !== Steps.BASIC_INFO && (
              <Button type='button' variant='secondary'>
                Back
              </Button>
            )}
            <div className='flex gap-4'>
              <Button
                type='button'
                variant={
                  currentStep === Steps.BASIC_INFO ? 'default' : 'secondary'
                }
              >
                Add a question
              </Button>
              {currentStep === Steps.ADD_QUESTION && (
                <Button form='create-quiz' type='submit'>
                  Create
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
