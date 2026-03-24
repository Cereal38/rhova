'use client';

import { Button } from '@/components/ui/button';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import { useTranslations } from 'next-intl';

interface Props {
  onStepChange: (step: CreateQuizStep) => void;
}

export default function SelectModStep({ onStepChange }: Readonly<Props>) {
  const t = useTranslations();

  return (
    <div>
      <Button onClick={() => onStepChange(CreateQuizStep.CreateSetName)}>
        {t('create-quiz.new-quiz')}
      </Button>
      <Button onClick={() => onStepChange(CreateQuizStep.EditSetName)}>
        {t('create-quiz.edit-quiz')}
      </Button>
    </div>
  );
}
