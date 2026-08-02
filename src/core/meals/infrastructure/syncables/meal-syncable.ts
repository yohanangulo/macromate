import { Entities, SyncStatesDataSource } from '@/core/shared/data-sources/sync-states-data-source'
import { ConflictResolved, resolveConflictLWW, Syncable } from '../../domain/syncable'
import { MealRemoteDataSource } from '../data-sources/http-meal-remote-data-source'
import { MealLocalDataSource } from '../data-sources/meal-local-data-source'
import { mealsMapper } from '../data-sources/meals-mapper'

export class MealSyncable implements Syncable {
  constructor(
    private mealLocalDataSource: MealLocalDataSource,
    private mealRemoteDataSource: MealRemoteDataSource,
    private syncStatesDataSource: SyncStatesDataSource,
  ) {}

  private async upSync() {
    const unsyncedMeals = await this.mealLocalDataSource.getUnsynced()

    // if there are no unsynced meals, we don't need to do anything
    if (unsyncedMeals.length === 0) return

    const mealDtos = unsyncedMeals.map(meal => mealsMapper.toDto(meal, { isDeleted: meal.isDeleted }))

    await this.mealRemoteDataSource.saveMany(mealDtos)

    // mark all meals as synced
    await Promise.all(unsyncedMeals.map(meal => this.mealLocalDataSource.markAsSynced(meal.id)))
  }

  private async downSync() {
    const lastSyncedAt: Date | null = await this.syncStatesDataSource.get(Entities.meal)
    const remoteChanges = await this.mealRemoteDataSource.fetchMealsSynce(lastSyncedAt)

    console.log('remoteChanges count', remoteChanges.meals.length)

    for (const remoteMeal of remoteChanges.meals) {
      const localMeal = await this.mealLocalDataSource.getById(remoteMeal.id)

      if (localMeal) {
        const resolved: ConflictResolved = resolveConflictLWW({
          localUpdatedAt: localMeal.updatedAt,
          remoteUpdatedAt: new Date(remoteMeal.updatedAt),
        })

        if (resolved === 'local') continue
      }

      const meal = mealsMapper.toModel(mealsMapper.fromDto(remoteMeal))
      meal.isDeleted = remoteMeal.isDeleted
      meal.synced = true

      await this.mealLocalDataSource.save(meal)
    }

    if (!remoteChanges.syncTimestamp) return

    await this.syncStatesDataSource.set(Entities.meal, new Date(remoteChanges.syncTimestamp))
  }

  async sync(): Promise<void> {
    try {
      await this.upSync()
      await this.downSync()
    } catch (error) {
      console.log('💥 syncing has failed', error)
    }
  }
}
