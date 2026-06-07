import { MealRepository } from '../domain'

export function clearAllMeals(mealRepository: MealRepository) {
  return async () => {
    await mealRepository.clearAll()
  }
}
