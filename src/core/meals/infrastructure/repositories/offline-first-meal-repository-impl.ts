import { MealEntity, MealLocalDataSource, MealRepository } from '../../domain'
import { MealRemoteDataSource } from '../data-sources/http-meal-remote-data-source'

export class OfflineFirstMealRepositoryImpl implements MealRepository {
  constructor(
    private mealLocalDataSource: MealLocalDataSource,
    private mealRemoteDataSource: MealRemoteDataSource,
  ) {}

  async save(meal: MealEntity): Promise<void> {
    await this.mealLocalDataSource.save(meal)
    // await this.mealRemoteDataSource.save(meal)
  }

  async getAll(): Promise<MealEntity[]> {
    return this.mealLocalDataSource.getAll()
  }

  async delete(id: string): Promise<void> {
    await this.mealLocalDataSource.delete(id)
    // await this.mealRemoteDataSource.delete(id)
  }
}
