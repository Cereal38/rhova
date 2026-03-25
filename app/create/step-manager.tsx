'use client';

import { useState } from 'react';
import SelectModStep from './select-mod-step';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import CreateSetTitleStep from './create-set-title-step';

export default function StepManager() {
  const [step, setStep] = useState<CreateQuizStep>(CreateQuizStep.SelectMod);

  function stepChangeHandler(step: CreateQuizStep) {
    setStep(step);
  }

  switch (step) {
    case CreateQuizStep.SelectMod:
      return <SelectModStep onStepChange={stepChangeHandler} />;
    case CreateQuizStep.CreateSetTitle:
      return <CreateSetTitleStep onStepChange={stepChangeHandler} />;
  }
}
