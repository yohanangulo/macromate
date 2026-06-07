import { db } from '@/infrastructure/db/client'
import { mealsTable } from '@/infrastructure/db/schema'
import { eq, sum } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

const columns = {
  calories: sum(mealsTable.calories),
  protein: sum(mealsTable.protein),
  carbs: sum(mealsTable.carbs),
  fat: sum(mealsTable.fat),
}

export function useWatchMealsTotals() {
  const { data, error } = useLiveQuery(db.select(columns).from(mealsTable).where(eq(mealsTable.isDeleted, false)))

  if (!data.at(0))
    return {
      totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      error,
    }

  const totals = data[0]

  return {
    totals: {
      calories: Number(totals.calories),
      protein: Number(totals.protein),
      carbs: Number(totals.carbs),
      fat: Number(totals.fat),
    },
    error,
  }
}
