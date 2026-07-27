import { AppDatabase } from '@/infrastructure/db/client'
import { syncStatesTable } from '@/infrastructure/shared/sync-states-table'
import { eq } from 'drizzle-orm'

export enum Entities {
  meal = 'meal',
}

export class SyncStatesDataSource {
  constructor(private db: AppDatabase) {}

  async get(entity: Entities): Promise<Date | null> {
    const lastSync = await this.db.query.syncStatesTable.findFirst({ where: eq(syncStatesTable.entity, entity) })

    if (!lastSync) return null

    return lastSync.lastSyncedAt
  }

  async set(entity: Entities, lastSyncedAt: Date) {
    await this.db
      .insert(syncStatesTable)
      .values({
        entity,
        lastSyncedAt,
      })
      .onConflictDoUpdate({ target: syncStatesTable.entity, set: { lastSyncedAt } })
  }
}
