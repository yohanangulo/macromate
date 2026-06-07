import { MealModel } from '../models/meal-model'

export interface MealLocalDataSource {
  save: (meal: MealModel) => Promise<void>

  getAll: () => Promise<MealModel[]>

  getById: (id: string) => Promise<MealModel>

  delete: (id: string) => Promise<void>

  markAsSynced: (id: string) => Promise<void>
}
