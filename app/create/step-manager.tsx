'use client';

import { useMemo, useState } from 'react';
import SelectModStep from './select-mod-step';
import { CreateQuizStep } from '@/models/enums/create-quiz-step';
import CreateSetTitleStep from './create-set-title-step';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function StepManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the step from search params (Set select mod as default)
  const step = useMemo<CreateQuizStep>(() => {
    const paramStep = searchParams.get('step');
    if (
      paramStep &&
      Object.values(CreateQuizStep).includes(paramStep as CreateQuizStep)
    ) {
      return paramStep as CreateQuizStep;
    }
    return CreateQuizStep.SelectMod;
  }, [searchParams]);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  function stepChangeHandler(step: CreateQuizStep) {
    router.push(pathname + '?' + createQueryString('step', step));
  }

  switch (step) {
    case CreateQuizStep.SelectMod:
      return <SelectModStep onStepChange={stepChangeHandler} />;
    case CreateQuizStep.CreateSetTitle:
      return <CreateSetTitleStep onStepChange={stepChangeHandler} />;
  }
}
