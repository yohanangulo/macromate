import { MealRepository } from '../domain'

export class GetAllMeals {
  constructor(private readonly mealsRepository: MealRepository) {}
  async execute() {
    return this.mealsRepository.getAll()
  }
}
