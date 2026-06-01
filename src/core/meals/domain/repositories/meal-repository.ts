import { MealEntity } from '../entities/meals-entity'

export interface MealRepository {
  save: (meal: MealEntity) => Promise<void>

  getAll: () => Promise<MealEntity[]>

  delete: (id: string) => Promise<void>
}
