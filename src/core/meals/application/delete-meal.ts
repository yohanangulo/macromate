import { MealRepository } from '../domain'

export class DeleteMeal {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: string): Promise<void> {
    await this.mealRepository.delete(id)
  }
}
