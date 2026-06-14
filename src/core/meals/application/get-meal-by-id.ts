import { MealRepository } from '../domain'

export function createGetMealByIdUseCase(mealRepository: MealRepository) {
  return (id: string) => mealRepository.getById(id)
}
