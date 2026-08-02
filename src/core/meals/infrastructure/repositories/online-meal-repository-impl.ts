import { MealEntity, MealRepository } from '../../domain'
import { MealRemoteDataSource } from '../data-sources/http-meal-remote-data-source'
import { mealsMapper } from '../data-sources/meals-mapper'

export class OnlineMealRepositoryImpl implements MealRepository {
  constructor(private mealRemoteDataSource: MealRemoteDataSource) {}

  async save(meal: MealEntity): Promise<void> {
    await this.mealRemoteDataSource.saveMany([mealsMapper.toDto(meal)])
  }

  async getAll(): Promise<MealEntity[]> {
    const mealDtos = await this.mealRemoteDataSource.fetchAll()

    return mealDtos.map(mealsMapper.fromDto)
  }

  async getById(id: string): Promise<MealEntity | null> {
    const mealDto = await this.mealRemoteDataSource.fetchMeal(id)

    if (mealDto) return mealsMapper.fromDto(mealDto)

    return null
  }

  async delete(id: string): Promise<void> {}

  async clearAll(): Promise<void> {
    await this.mealRemoteDataSource.clearAll()
  }
}
