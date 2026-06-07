import { MealLocalDataSource, MealModel } from '@/core/meals/infrastructure'
import { AppDatabase } from '@/infrastructure/db/client'
import { eq } from 'drizzle-orm'
import { mealsTable } from './meals-table'

export class MealLocalDataSourceImpl implements MealLocalDataSource {
  constructor(private db: AppDatabase) {}

  async save(meal: MealModel): Promise<void> {
    await this.db.insert(mealsTable).values(meal).onConflictDoUpdate({ target: mealsTable.id, set: meal })
  }

  async getAll(): Promise<MealModel[]> {
    return this.db.select().from(mealsTable)
  }

  async getById(id: string): Promise<MealModel> {
    const meal = await this.db
      .select()
      .from(mealsTable)
      .where(eq(mealsTable.id, id))
      .limit(1)
      .then(result => result[0])

    return meal
  }

  async delete(id: string): Promise<void> {
    await this.db.update(mealsTable).set({ isDeleted: true, updatedAt: new Date() }).where(eq(mealsTable.id, id))
  }

  async markAsSynced(id: string): Promise<void> {
    await this.db.update(mealsTable).set({ synced: true }).where(eq(mealsTable.id, id))
  }
}
