import z from 'zod';

export const quizFormatValidator = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      correctAnswer: z.string(),
      wrongAnswers: z.array(z.string()),
    }),
  ),
});
