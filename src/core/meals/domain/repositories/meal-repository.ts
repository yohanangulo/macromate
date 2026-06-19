import { MealEntity } from '../entities/meals-entity'

export abstract class MealRepository {
  abstract save(meal: MealEntity): Promise<void>

  abstract getAll(): Promise<MealEntity[]>

  abstract getById(id: string): Promise<MealEntity | null>

  abstract delete(id: string): Promise<void>

  abstract clearAll(): Promise<void>
}
