import { MealRepository } from '../domain'

export function createGetAllMealsUseCase(mealsRepository: MealRepository) {
  return async () => mealsRepository.getAll()
}
