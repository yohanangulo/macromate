import { MealEntity, MealRepository } from '../../domain'
import { MealRemoteDataSource } from '../data-sources/http-meal-remote-data-source'
import { MealLocalDataSource } from '../data-sources/meal-local-data-source'
import { mealsMapper } from '../data-sources/meals-mapper'

export class OfflineFirstMealRepositoryImpl implements MealRepository {
  constructor(
    private mealLocalDataSource: MealLocalDataSource,
    private mealRemoteDataSource: MealRemoteDataSource,
  ) {}

  async save(meal: MealEntity): Promise<void> {
    await this.mealLocalDataSource.save(mealsMapper.toModel(meal))

    // if (!hasInternetConnection) return
    // try {
    //   await this.mealRemoteDataSource.save(meal)
    //   await this.mealLocalDataSource.markAsSynced(meal.id)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  async getAll(): Promise<MealEntity[]> {
    const models = await this.mealLocalDataSource.getAll()
    return models.map(mealsMapper.toEntity)
  }

  async getById(id: string): Promise<MealEntity | null> {
    const model = await this.mealLocalDataSource.getById(id)
    return model ? mealsMapper.toEntity(model) : null
  }

  async delete(id: string): Promise<void> {
    await this.mealLocalDataSource.delete(id)
    // await this.mealRemoteDataSource.delete(id)
  }

  async clearAll(): Promise<void> {
    await this.mealLocalDataSource.clearAll()
  }
}
