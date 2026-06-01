import { MealEntity, MealRepository } from '../../domain'
import { MealRemoteDataSource } from '../data-sources/http-meal-remote-data-source'

export class OnlineMealRepositoryImpl implements MealRepository {
  constructor(private mealRemoteDataSource: MealRemoteDataSource) {}

  async save(meal: MealEntity): Promise<void> {
    await this.mealRemoteDataSource.save(meal)
  }

  async getAll(): Promise<MealEntity[]> {
    return this.mealRemoteDataSource.fetchAll()
  }

  async delete(id: string): Promise<void> {
    await this.mealRemoteDataSource.delete(id)
  }
}
