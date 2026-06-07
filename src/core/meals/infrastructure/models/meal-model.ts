export interface MealModel {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  synced: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}
