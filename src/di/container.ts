import {
  createAddMealUseCase,
  createClearAllMealsUseCase,
  createDeleteMealUseCase,
  createUpdateMealUseCase,
} from '@/core/meals/application'
import { db } from '@/infrastructure/db/client'
import { ExpoIdGenerator } from '@/infrastructure/expo-id-generator'
import { http } from '@/infrastructure/http-client'
import { MealLocalDataSourceImpl } from '@/infrastructure/meals/data-sources/local/meal-local-data-source-impl'
import { MealRemoteDataSource, OfflineFirstMealRepositoryImpl } from '../core/meals/infrastructure'

export const mealsRepository = new OfflineFirstMealRepositoryImpl(new MealLocalDataSourceImpl(db), new MealRemoteDataSource(http))

const idGenerator = new ExpoIdGenerator()

export const addMeal = createAddMealUseCase(mealsRepository, idGenerator)
export const deleteMeal = createDeleteMealUseCase(mealsRepository)
export const clearAllMeals = createClearAllMealsUseCase(mealsRepository)
export const updateMeal = createUpdateMealUseCase(mealsRepository)
