import { AddMealOutputSchema, MealRepository } from '../domain'

export function createUpdateMealUseCase(mealRepository: MealRepository) {
  return async (id: string, { calories, carbs, fat, name, protein }: AddMealOutputSchema): Promise<void> => {
    const now = new Date()

    const meal = await mealRepository.getById(id)

    if (!meal) throw new Error('Meal not found')

    meal.name = name
    meal.calories = calories
    meal.protein = protein
    meal.carbs = carbs
    meal.fat = fat
    meal.updatedAt = now

    await mealRepository.save(meal)
  }
}
