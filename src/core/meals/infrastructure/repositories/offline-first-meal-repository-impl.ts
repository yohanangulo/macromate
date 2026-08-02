import { MealEntity, MealRepository } from '../../domain'
import { MealLocalDataSource } from '../data-sources/meal-local-data-source'
import { mealsMapper } from '../data-sources/meals-mapper'

export class OfflineFirstMealRepositoryImpl implements MealRepository {
  constructor(private mealLocalDataSource: MealLocalDataSource) {}

  async save(meal: MealEntity): Promise<void> {
    await this.mealLocalDataSource.save(mealsMapper.toModel(meal))
  }

  async getAll(): Promise<MealEntity[]> {
    const models = await this.mealLocalDataSource.getAll()
    return models.map(mealsMapper.fromModel)
  }

  async getById(id: string): Promise<MealEntity | null> {
    const model = await this.mealLocalDataSource.getById(id)
    return model ? mealsMapper.fromModel(model) : null
  }

  async delete(id: string): Promise<void> {
    await this.mealLocalDataSource.delete(id)
  }

  async clearAll(): Promise<void> {
    await this.mealLocalDataSource.clearAll()
  }
}
