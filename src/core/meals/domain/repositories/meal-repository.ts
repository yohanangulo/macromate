import { MealEntity } from '../entities/meals-entity'

export interface MealRepository {
  save: (meal: MealEntity) => Promise<void>

  getAll: () => Promise<MealEntity[]>

  getById: (id: string) => Promise<MealEntity | null>

  delete: (id: string) => Promise<void>
}
