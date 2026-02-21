import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function StartQuizForm() {
  return (
    <form className='flex flex-col gap-4'>
      <Field className='pt-4'>
        <FieldLabel htmlFor='quiz'>File</FieldLabel>
        <FieldDescription>
          To start a quiz, select a .rhova file from your system. If you don't
          have one, you can create one from the "
          <Link href='/quiz-settings/create'>create a quiz</Link>" page
        </FieldDescription>
        <Input id='quiz' type='file' />
      </Field>
      <Button>Start the quiz</Button>
    </form>
  );
}
