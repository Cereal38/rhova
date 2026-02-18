import z from 'zod';

export const createQuizBasicInfoValidator = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Quiz title must be at least 3 characters')
    .max(30, 'Quiz title must be at most 30 character'),
});
