import z from 'zod';

export const quizFormatValidator = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(1),
      correctAnswer: z.string().min(1),
      wrongAnswers: z.array(z.string().min(1)).min(1).max(3),
    }),
  ),
});
