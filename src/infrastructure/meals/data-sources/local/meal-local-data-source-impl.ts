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
    return this.db.select().from(mealsTable).where(eq(mealsTable.isDeleted, false))
  }

  async getById(id: string): Promise<MealModel | null> {
    const meal = await this.db.query.mealsTable.findFirst({
      where: eq(mealsTable.id, id),
    })

    if (!meal) return null

    return meal
  }

  async delete(id: string): Promise<void> {
    await this.db.update(mealsTable).set({ isDeleted: true, updatedAt: new Date(), synced: false }).where(eq(mealsTable.id, id))
  }

  async markAsSynced(id: string): Promise<void> {
    await this.db.update(mealsTable).set({ synced: true }).where(eq(mealsTable.id, id))
  }

  async clearAll(): Promise<void> {
    await this.db
      .update(mealsTable)
      .set({ isDeleted: true, updatedAt: new Date(), synced: false })
      .where(eq(mealsTable.isDeleted, false))
  }
}
