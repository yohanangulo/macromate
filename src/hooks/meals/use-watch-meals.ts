import { MealEntity } from '@/core/meals/domain'
import { mealsMapper } from '@/core/meals/infrastructure/data-sources/meals-mapper'
import { db } from '@/infrastructure/db/client'
import { mealsTable } from '@/infrastructure/db/schema'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

type QueryResult = {
  meals: MealEntity[]
  error: unknown
}

export function useWatchMeals(): QueryResult {
  const { data: meals, error } = useLiveQuery(db.select().from(mealsTable))

  return {
    meals: meals.map(mealsMapper.toEntity),
    error,
  }
}
