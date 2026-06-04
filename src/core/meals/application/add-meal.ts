import { IdGenerator } from '../../shared/id-generator'
import { AddMealOutputSchema, MealEntity, MealRepository } from '../domain'

export class AddMeal {
  constructor(
    private mealRepository: MealRepository,
    private idGenerator: IdGenerator,
  ) {}

  async execute(input: AddMealOutputSchema): Promise<void> {
    const meal = new MealEntity({
      id: this.idGenerator.generate(),
      name: input.name,
      calories: input.calories,
      protein: input.protein,
      carbs: input.carbs,
      fat: input.fat,
    })

    await this.mealRepository.save(meal)
  }
}
