import { MealRepository } from '../domain'

export class GetMealById {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: string) {
    return this.mealRepository.getById(id)
  }
}
