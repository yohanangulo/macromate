export class MealEntity {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  createdAt: Date
  updatedAt: Date

  constructor({
    id,
    name,
    calories,
    protein,
    carbs,
    fat,
  }: {
    id: string
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }) {
    this.id = id
    this.name = name
    this.calories = calories
    this.protein = protein
    this.carbs = carbs
    this.fat = fat
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
