import { z } from 'zod';

export const CategoryEnum = z.enum([
  'Technology',
  'Business',
  'Education',
  'Health',
  'Entertainment',
  'Social Impact',
  'Finance',
  'Other',
]);

export type Category = z.infer<typeof CategoryEnum>;

export const CreatePlanSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title must be at most 120 characters')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be at most 2000 characters')
    .trim(),
  category: CategoryEnum,
});

export type CreatePlanInput = z.infer<typeof CreatePlanSchema>;

export const AIPlanResultSchema = z.object({
  summary: z.string(),
  techStack: z.array(z.string()),
  steps: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .min(4)
    .max(6),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  challenges: z.array(z.string()),
});

export type AIPlanResult = z.infer<typeof AIPlanResultSchema>;

export interface Plan {
  id: string;
  title: string;
  description: string;
  category: string;
  ai_result: AIPlanResult;
  created_at: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface ApiSuccess<T> {
  data: T;
}
