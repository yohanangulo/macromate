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

  async getById(id: string): Promise<MealEntity | null> {
    return null
  }

  async delete(id: string): Promise<void> {
    await this.mealRemoteDataSource.delete(id)
  }

  async clearAll(): Promise<void> {}
}
