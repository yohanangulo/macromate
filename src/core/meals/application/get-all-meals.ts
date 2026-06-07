import { MealRepository } from '../domain'

export function getAllMeals(mealsRepository: MealRepository) {
  return async () => mealsRepository.getAll()
}
