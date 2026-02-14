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
import { createQuizBasicInfoValidator } from '@/app/validators/create-quiz-basic-info-validator';
import QuizInput from '@/app/models/quiz-input';

const enum Step {
  'BASIC_INFO',
  'ADD_QUESTION',
}

export default function CreateQuizPage() {
  const [actionState, formAction] = useActionState(createQuiz, null);
  const [currentStep, setCurrentStep] = useState<Step>(Step.BASIC_INFO);
  const [formErrors, setFormErrors] = useState<any | null>(null); // TODO: Type this correctly
  const [quizInput, setQuizInput] = useState<QuizInput>({
    title: '',
    questions: [],
  });

  const quizTitleChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuizInput((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };

  const transition = (destination: Step) => {
    const source: Step = currentStep;
    const form = document.getElementById(
      'create-quiz-form',
    ) as HTMLFormElement | null;
    if (!form) return;

    const formData = new FormData(form);

    // BASIC_INFO -> ADD_QUESTION
    if (source === Step.BASIC_INFO && destination === Step.ADD_QUESTION) {
      const basicInfoValidation = createQuizBasicInfoValidator.safeParse({
        title: formData.get('title'),
      });

      if (!basicInfoValidation.success) {
        setFormErrors({
          title:
            basicInfoValidation.error.issues[0]?.message ?? 'Invalid title',
        });
        return;
      }

      setFormErrors(null);
      setCurrentStep(Step.ADD_QUESTION);
    }

    // ADD_QUESTION -> BASIC_INFO
    if (source === Step.ADD_QUESTION && destination === Step.BASIC_INFO) {
      setCurrentStep(Step.BASIC_INFO);
    }
  };

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
            id='create-quiz-form'
            action={formAction}
            className='flex flex-col gap-8'
          >
            {currentStep === Step.BASIC_INFO && (
              <CreateQuizFieldGroup
                errors={formErrors}
                quizInput={quizInput}
                onQuizInputChange={quizTitleChangeHandler}
              />
            )}
            {currentStep === Step.ADD_QUESTION && <AddQuestionFieldGroup />}
          </Form>
        </CardContent>
        <CardFooter>
          <div className='flex justify-between w-full'>
            {currentStep === Step.ADD_QUESTION && (
              <Button
                type='button'
                variant='secondary'
                onClick={() => transition(Step.BASIC_INFO)}
              >
                Back
              </Button>
            )}
            <div className='flex gap-4'>
              <Button
                type='button'
                variant={
                  currentStep === Step.BASIC_INFO ? 'default' : 'secondary'
                }
                onClick={() => transition(Step.ADD_QUESTION)}
              >
                Add a question
              </Button>
              {currentStep === Step.ADD_QUESTION && (
                <Button form='create-quiz-form' type='submit'>
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
