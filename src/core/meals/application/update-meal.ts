import { MealRepository } from '../domain'

type UpdateMealProps = {
  name?: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
}

export function createUpdateMealUseCase(mealRepository: MealRepository) {
  return async (id: string, { calories, carbs, fat, name, protein }: UpdateMealProps): Promise<void> => {
    const now = new Date()

    const meal = await mealRepository.getById(id)

    if (meal === null) throw new Error('Meal not found')

    if (name !== undefined) meal.name = name
    if (calories !== undefined) meal.calories = calories
    if (protein !== undefined) meal.protein = protein
    if (carbs !== undefined) meal.carbs = carbs
    if (fat !== undefined) meal.fat = fat
    meal.updatedAt = now

    await mealRepository.save(meal)
  }
}
