'use client';

import { useState } from 'react';

enum CreateQuizStep {
  SelectMod = 'select-mod',
  CreateSetName = 'create-set-name',
}

export default function StepManager() {
  const [step, setStep] = useState<CreateQuizStep>(CreateQuizStep.SelectMod);

  switch (step) {
    case CreateQuizStep.SelectMod:
      return <div>Select mod</div>;
    case CreateQuizStep.CreateSetName:
      return <div>Create set name</div>;
  }
}
