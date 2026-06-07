import { MealRepository } from '../domain'

export function getMealById(mealRepository: MealRepository) {
  return (id: string) => mealRepository.getById(id)
}
