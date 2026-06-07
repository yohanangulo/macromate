import { MealRemoteDataSource } from './data-sources/http-meal-remote-data-source'
import { MealLocalDataSource } from './data-sources/meal-local-data-source'

export class SyncService {
  constructor(
    private mealLocalDataSource: MealLocalDataSource,
    private mealRemoteDataSource: MealRemoteDataSource,
  ) {}

  async sync(): Promise<void> {}
}
