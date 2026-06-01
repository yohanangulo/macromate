import { MealEntity } from '..'

export interface MealLocalDataSource {
  save: (meal: MealEntity) => Promise<void>

  getAll: () => Promise<MealEntity[]>

  delete: (id: string) => Promise<void>
}
