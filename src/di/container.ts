import {
  createAddMealUseCase,
  createClearAllMealsUseCase,
  createDeleteMealUseCase,
  createGetMealByIdUseCase,
  createUpdateMealUseCase,
} from '@/core/meals/application'
import { SyncService } from '@/core/meals/infrastructure/sync-service'
import { MealSyncable } from '@/core/meals/infrastructure/syncables/meal-syncable'
import { SyncStatesDataSource } from '@/core/shared/data-sources/sync-states-data-source'
import { db } from '@/infrastructure/db/client'
import { ExpoIdGenerator } from '@/infrastructure/expo-id-generator'
import { http } from '@/infrastructure/http-client'
import { MealLocalDataSourceImpl } from '@/infrastructure/meals/data-sources/local/meal-local-data-source-impl'
import { MealRemoteDataSource, OfflineFirstMealRepositoryImpl } from '../core/meals/infrastructure'

export const mealsLocalDataSource = new MealLocalDataSourceImpl(db)

export const syncStatesDataSource = new SyncStatesDataSource(db)
export const mealsRepository = new OfflineFirstMealRepositoryImpl(mealsLocalDataSource)

export const mealsRemoteDataSource = new MealRemoteDataSource(http)

export const syncService = new SyncService([new MealSyncable(mealsLocalDataSource, mealsRemoteDataSource, syncStatesDataSource)])

const idGenerator = new ExpoIdGenerator()

export const addMeal = createAddMealUseCase(mealsRepository, idGenerator)
export const deleteMeal = createDeleteMealUseCase(mealsRepository)
export const clearAllMeals = createClearAllMealsUseCase(mealsRepository)
export const updateMeal = createUpdateMealUseCase(mealsRepository)
export const getMealById = createGetMealByIdUseCase(mealsRepository)
