import * as mealUseCases from '@/core/meals/application'
import { db } from '@/infrastructure/db/client'
import { ExpoIdGenerator } from '@/infrastructure/expo-id-generator'
import { http } from '@/infrastructure/http-client'
import { MealLocalDataSourceImpl } from '@/infrastructure/meals/data-sources/local/meal-local-data-source-impl'
import { MealRemoteDataSource, OfflineFirstMealRepositoryImpl } from '../core/meals/infrastructure'

export const mealsRepository = new OfflineFirstMealRepositoryImpl(new MealLocalDataSourceImpl(db), new MealRemoteDataSource(http))

const idGenerator = new ExpoIdGenerator()

export const addMeal = mealUseCases.addMeal(mealsRepository, idGenerator)
export const deleteMeal = mealUseCases.deleteMeal(mealsRepository)
