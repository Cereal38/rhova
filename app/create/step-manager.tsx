'use client';

import { useCallback, useState } from 'react';
import SelectModStep from './select-mod-step';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import CreateSetTitleStep from './create-set-title-step';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function StepManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<CreateQuizStep>(CreateQuizStep.SelectMod);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  function stepChangeHandler(step: CreateQuizStep) {
    setStep(step);
    router.push(pathname + '?' + createQueryString('step', step));
  }

  switch (step) {
    case CreateQuizStep.SelectMod:
      return <SelectModStep onStepChange={stepChangeHandler} />;
    case CreateQuizStep.CreateSetTitle:
      return <CreateSetTitleStep onStepChange={stepChangeHandler} />;
  }
}
