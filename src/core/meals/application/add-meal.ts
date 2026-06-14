import { IdGenerator } from '../../shared/id-generator'
import { MealEntity, MealRepository } from '../domain'

export type AddMealProps = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function createAddMealUseCase(mealRepository: MealRepository, idGenerator: IdGenerator) {
  return async (input: AddMealProps) => {
    const now = new Date()

    const meal = new MealEntity({
      id: idGenerator.generate(),
      name: input.name,
      calories: input.calories,
      protein: input.protein,
      carbs: input.carbs,
      fat: input.fat,
      createdAt: now,
      updatedAt: now,
    })

    await mealRepository.save(meal)
  }
}
