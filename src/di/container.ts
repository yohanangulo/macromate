import { AddMeal } from '@/core/meals/application'
import { ExpoIdGenerator } from '@/infrastructure/expo-id-generator'
import { http } from '@/infrastructure/http-client'
import { MealLocalDataSourceImpl } from '@/infrastructure/meals/data-sources/local/meal-local-data-source-impl'
import { MealRemoteDataSource, OfflineFirstMealRepositoryImpl } from '../core/meals/infrastructure'

export const mealsRepository = new OfflineFirstMealRepositoryImpl(new MealLocalDataSourceImpl(), new MealRemoteDataSource(http))

const idGenerator = new ExpoIdGenerator()

export const addMeal = new AddMeal(mealsRepository, idGenerator)
