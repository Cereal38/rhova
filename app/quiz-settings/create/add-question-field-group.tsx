import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export default function AddQuestionFieldGroup() {
  const t = useTranslations();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor='question-X'>
          {t('create-quiz.question-label', { number: 'X' })}
        </FieldLabel>
        <FieldDescription>{t('create-quiz.question-description')}</FieldDescription>
        <Input
          id='question-X'
          name='question-X'
          autoCapitalize='off'
          placeholder={t('create-quiz.question-placeholder')}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='correct-answer-X'>
          {t('create-quiz.correct-answer-label')}
        </FieldLabel>
        <FieldDescription>{t('create-quiz.correct-answer-description')}</FieldDescription>
        <Input
          id='correct-answer-X'
          name='correct-answer-X'
          autoCapitalize='off'
          placeholder={t('create-quiz.correct-answer-placeholder')}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='wrong-answer-X-1'>
          {t('create-quiz.wrong-answer-label', { number: 1 })}
        </FieldLabel>
        <FieldDescription>{t('create-quiz.wrong-answer-description')}</FieldDescription>
        <Input
          id='wrong-answer-X-1'
          name='wrong-answer-X-1'
          autoCapitalize='off'
          placeholder={t('create-quiz.wrong-answer-1-placeholder')}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='wrong-answer-X-2'>
          {t('create-quiz.wrong-answer-label', { number: 2 })}
        </FieldLabel>
        <FieldDescription>{t('create-quiz.wrong-answer-description')}</FieldDescription>
        <Input
          id='wrong-answer-X-2'
          name='wrong-answer-X-2'
          autoCapitalize='off'
          placeholder={t('create-quiz.wrong-answer-2-placeholder')}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='wrong-answer-X-3'>
          {t('create-quiz.wrong-answer-label', { number: 3 })}
        </FieldLabel>
        <FieldDescription>{t('create-quiz.wrong-answer-description')}</FieldDescription>
        <Input
          id='wrong-answer-X-3'
          name='wrong-answer-X-3'
          autoCapitalize='off'
          placeholder={t('create-quiz.wrong-answer-3-placeholder')}
        />
      </Field>
    </FieldGroup>
  );
}
