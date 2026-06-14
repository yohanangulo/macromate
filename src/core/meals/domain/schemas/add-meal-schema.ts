import { z } from 'zod'

export const addMealSchema = z
  .object({
    name: z.string().trim().min(3, 'Meal name must be at least 3 characters long'),
    calories: z.coerce.number({ error: 'Calories must be a number' }).gt(0, 'Calories must be greater than 0'),
    protein: z.coerce
      .number({ error: 'Protein must be a number' })
      .gte(0, 'Protein must be a positive number')
      .optional()
      .default(0),
    carbs: z.coerce.number({ error: 'Carbs must be a number' }).gte(0, 'Carbs must be a positive number').optional().default(0),
    fat: z.coerce.number({ error: 'Fat must be a number' }).gte(0, 'Fat must be a positive number').optional().default(0),
  })
  .refine(data => data.protein + data.carbs + data.fat !== 0, {
    message: 'You must add at least one macro to your meal',
    path: ['protein'],
  })

export type AddMealSchema = z.input<typeof addMealSchema>
export type AddMealOutputSchema = z.output<typeof addMealSchema>
