import { mealsMapper } from '@/core/meals/infrastructure/data-sources/meals-mapper'
import { db } from '@/infrastructure/db/client'
import { mealsTable } from '@/infrastructure/db/schema'
import { desc, eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

export function useWatchRecentMeals(limit: number = 5) {
  const q = db.select().from(mealsTable).orderBy(desc(mealsTable.createdAt)).where(eq(mealsTable.isDeleted, false)).limit(limit)

  const { data: recentMeals, error } = useLiveQuery(q)

  return {
    meals: recentMeals.map(mealsMapper.toEntity),
    error,
  }
}
