import { IdGenerator } from '../../shared/id-generator'
import { MealEntity, MealRepository } from '../domain'

export type AddMealProps = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export class AddMeal {
  constructor(
    private mealRepository: MealRepository,
    private idGenerator: IdGenerator,
  ) {}

  async execute(input: AddMealProps): Promise<void> {
    const now = new Date()

    const meal = new MealEntity({
      id: this.idGenerator.generate(),
      name: input.name,
      calories: input.calories,
      protein: input.protein,
      carbs: input.carbs,
      fat: input.fat,
      createdAt: now,
      updatedAt: now,
    })

    await this.mealRepository.save(meal)
  }
}
