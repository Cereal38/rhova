'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FieldDescription, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import Question from '@/models/interfaces/question';
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
  onQuestionsChange: (questions: Question[]) => void;
  questions: Question[];
}

const emptyQuestion: Question = {
  question: '',
  correctAnswer: '',
  wrongAnswers: ['', '', ''],
};

function isQuestionIncomplete(question: Question) {
  return (
    question.question === '' ||
    question.correctAnswer === '' ||
    question.wrongAnswers.includes('')
  );
}

function firstIncompleteQuestionIndex(questions: Question[]) {
  const index = questions.findIndex(isQuestionIncomplete);
  return index === -1 ? null : index;
}

export default function SetQuestionsStep({
  onStepChange,
  onQuestionsChange,
  questions,
}: Readonly<Props>) {
  const t = useTranslations();
  const validationSummaryRef = useRef<HTMLDivElement>(null);
  const [openAccordionItem, setOpenAccordionItem] = useState<
    string | undefined
  >(undefined);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showFieldErrors, setShowFieldErrors] = useState(false);

  function clearValidationFeedback() {
    setValidationError(null);
    setShowFieldErrors(false);
  }

  function addQuestion() {
    clearValidationFeedback();
    onQuestionsChange([
      ...questions,
      { ...emptyQuestion, wrongAnswers: [...emptyQuestion.wrongAnswers] },
    ]);
  }

  function removeQuestion(index: number) {
    clearValidationFeedback();
    onQuestionsChange(questions.filter((_, i) => i !== index));
  }

  function removeWrongAnswerHandler(
    questionIndex: number,
    answerIndex: number,
  ) {
    console.log('REMOVE ANSWER');
    clearValidationFeedback();
    onQuestionsChange(
      questions.map((q, i) => {
        if (i !== questionIndex) return q;
        const wrongAnswers = [...q.wrongAnswers];
        wrongAnswers.splice(answerIndex, 1);
        return { ...q, wrongAnswers };
      }),
    );
  }

  function updateQuestion(
    index: number,
    field: 'question' | 'correctAnswer',
    value: string,
  ) {
    clearValidationFeedback();
    const updated = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    onQuestionsChange(updated);
  }

  function updateWrongAnswer(
    questionIndex: number,
    answerIndex: number,
    value: string,
  ) {
    clearValidationFeedback();
    const updated = questions.map((q, i) => {
      if (i !== questionIndex) return q;
      const wrongAnswers = [...q.wrongAnswers];
      wrongAnswers[answerIndex] = value;
      return { ...q, wrongAnswers };
    });
    onQuestionsChange(updated);
  }

  function nextStepHandler() {
    if (questions.length === 0) {
      setShowFieldErrors(true);
      setValidationError(t('create-quiz.set-questions-error-no-questions'));
      requestAnimationFrame(() => {
        validationSummaryRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      });
      return;
    }

    const firstBad = firstIncompleteQuestionIndex(questions);
    if (firstBad !== null) {
      setShowFieldErrors(true);
      setValidationError(t('create-quiz.set-questions-error-incomplete'));
      setOpenAccordionItem(`question-${firstBad}`);
      requestAnimationFrame(() => {
        validationSummaryRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      });
      return;
    }

    clearValidationFeedback();
    onStepChange(CreateQuizStep.DownloadFile);
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{t('create-quiz.set-questions-title')}</h1>
        <FieldDescription>
          {t('create-quiz.set-questions-description')}
        </FieldDescription>
      </div>
      <Accordion
        type='single'
        collapsible
        value={openAccordionItem}
        onValueChange={setOpenAccordionItem}
      >
        {questions.map((question, qIndex) => (
          <AccordionItem key={qIndex} value={`question-${qIndex}`}>
            <div className='flex items-center'>
              <div className='flex-1'>
                <AccordionTrigger className='cursor-pointer'>
                  {question.question ||
                    t('create-quiz.question-number', { number: qIndex + 1 })}
                </AccordionTrigger>
              </div>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='mx-1 cursor-pointer text-destructive'
                aria-label={t('create-quiz.remove-question')}
                onClick={() => removeQuestion(qIndex)}
              >
                <Trash2 />
              </Button>
            </div>
            {/* QUESTION */}
            <AccordionContent className='flex flex-col gap-3 px-1'>
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.question-label')}</Label>
                <Input
                  placeholder={t('create-quiz.question-placeholder')}
                  value={question.question}
                  aria-invalid={
                    showFieldErrors && question.question === ''
                      ? true
                      : undefined
                  }
                  onChange={(e) =>
                    updateQuestion(qIndex, 'question', e.target.value)
                  }
                />
              </div>
              {/* CORRECT ANSWER */}
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.correct-answer-label')}</Label>
                <Input
                  placeholder={t('create-quiz.correct-answer-placeholder')}
                  value={question.correctAnswer}
                  aria-invalid={
                    showFieldErrors && question.correctAnswer === ''
                      ? true
                      : undefined
                  }
                  onChange={(e) =>
                    updateQuestion(qIndex, 'correctAnswer', e.target.value)
                  }
                />
              </div>
              {/* WRONG ANSWERS */}
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.wrong-answers-label')}</Label>
                <div className='flex flex-col gap-2'>
                  {question.wrongAnswers.map((answer, aIndex) => (
                    <div key={aIndex} className='relative'>
                      <Input
                        placeholder={t('create-quiz.wrong-answer-placeholder', {
                          number: aIndex + 1,
                        })}
                        value={answer}
                        aria-invalid={
                          showFieldErrors && answer === '' ? true : undefined
                        }
                        onChange={(e) =>
                          updateWrongAnswer(qIndex, aIndex, e.target.value)
                        }
                      />
                      {aIndex !== 0 && (
                        <Button
                          variant='ghost'
                          size='icon'
                          className='absolute right-0 top-0 h-full px-3 cursor-pointer'
                          onClick={() =>
                            removeWrongAnswerHandler(qIndex, aIndex)
                          }
                        >
                          <Minus className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type='button'
        variant='outline'
        className='w-fit cursor-pointer'
        onClick={addQuestion}
      >
        <Plus />
        {t('create-quiz.add-question')}
      </Button>
      {validationError && (
        <div ref={validationSummaryRef} className='scroll-mt-4'>
          <FieldError className='rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5'>
            {validationError}
          </FieldError>
        </div>
      )}
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          className='w-fit cursor-pointer'
          aria-label={t('common.previous')}
          onClick={() => onStepChange(CreateQuizStep.SetTitle)}
        >
          <ArrowLeft />
        </Button>
        <Button
          type='button'
          className='w-fit cursor-pointer'
          aria-label={t('common.next')}
          onClick={() => nextStepHandler()}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
