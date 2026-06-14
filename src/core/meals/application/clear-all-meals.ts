import { MealRepository } from '../domain'

export function createClearAllMealsUseCase(mealRepository: MealRepository) {
  return async () => {
    await mealRepository.clearAll()
  }
}
