import { http } from '@/infrastructure/http-client'
import { MealLocalDataSourceImpl } from '@/infrastructure/meal-local-data-source-impl'
import { MealRemoteDataSource, OfflineFirstMealRepositoryImpl } from '../core/meals/infrastructure'

export const mealsRepository = new OfflineFirstMealRepositoryImpl(new MealLocalDataSourceImpl(), new MealRemoteDataSource(http))
