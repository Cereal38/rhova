'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface Props {
  errors: any; // TODO: Type this correctly
}

export default function CreateQuizFieldGroup({ errors }: Props) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor='title'>Quiz title</FieldLabel>
        <FieldDescription>What your quiz will be about?</FieldDescription>
        <Input
          id='title'
          name='title'
          autoComplete='off'
          placeholder='Chemistry terminology'
          aria-invalid={!!errors?.title}
        />
        {!!errors?.title && <FieldError>{errors.title}</FieldError>}
      </Field>
    </FieldGroup>
  );
}
