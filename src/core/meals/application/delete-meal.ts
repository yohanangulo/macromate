import { MealRepository } from '../domain'

export function createDeleteMealUseCase(mealRepository: MealRepository) {
  return async (id: string) => {
    await mealRepository.delete(id)
  }
}
