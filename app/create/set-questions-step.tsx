'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import Question from '@/models/interfaces/question';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

export default function SetQuestionsStep({
  onStepChange,
  onQuestionsChange,
  questions,
}: Readonly<Props>) {
  const t = useTranslations();

  function addQuestion() {
    onQuestionsChange([
      ...questions,
      { ...emptyQuestion, wrongAnswers: [...emptyQuestion.wrongAnswers] },
    ]);
  }

  function removeQuestion(index: number) {
    onQuestionsChange(questions.filter((_, i) => i !== index));
  }

  function updateQuestion(
    index: number,
    field: 'question' | 'correctAnswer',
    value: string,
  ) {
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
    const updated = questions.map((q, i) => {
      if (i !== questionIndex) return q;
      const wrongAnswers = [...q.wrongAnswers];
      wrongAnswers[answerIndex] = value;
      return { ...q, wrongAnswers };
    });
    onQuestionsChange(updated);
  }

  function nextStepHandler() {
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
      <Accordion type='single' collapsible defaultValue={undefined}>
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
            <AccordionContent className='flex flex-col gap-3 px-1'>
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.question-label')}</Label>
                <Input
                  placeholder={t('create-quiz.question-placeholder')}
                  value={question.question}
                  onChange={(e) =>
                    updateQuestion(qIndex, 'question', e.target.value)
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.correct-answer-label')}</Label>
                <Input
                  placeholder={t('create-quiz.correct-answer-placeholder')}
                  value={question.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(qIndex, 'correctAnswer', e.target.value)
                  }
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>{t('create-quiz.wrong-answers-label')}</Label>
                <div className='flex flex-col gap-2'>
                  {question.wrongAnswers.map((answer, aIndex) => (
                    <div key={aIndex} className='flex gap-2'>
                      <Input
                        placeholder={t('create-quiz.wrong-answer-placeholder', {
                          number: aIndex + 1,
                        })}
                        value={answer}
                        onChange={(e) =>
                          updateWrongAnswer(qIndex, aIndex, e.target.value)
                        }
                      />
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
