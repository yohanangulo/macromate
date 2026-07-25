export class MealEntity {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  createdAt: Date
  updatedAt: Date

  constructor(meal: MealEntity) {
    this.id = meal.id
    this.name = meal.name
    this.calories = meal.calories
    this.protein = meal.protein
    this.carbs = meal.carbs
    this.fat = meal.fat
    this.createdAt = meal.createdAt
    this.updatedAt = meal.updatedAt
  }
}
