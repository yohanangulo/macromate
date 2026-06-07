import { MealRepository } from '../domain'

export function deleteMeal(mealRepository: MealRepository) {
  return async (id: string) => {
    await mealRepository.delete(id)
  }
}
