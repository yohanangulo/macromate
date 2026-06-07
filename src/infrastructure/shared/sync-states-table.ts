import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const syncStatesTable = sqliteTable('sync_states', {
  id: int().primaryKey({ autoIncrement: true }),
  entity: text().unique().notNull(),
  lastSyncedAt: int('last_synced_at', { mode: 'timestamp_ms' }).notNull(),

  createdAt: int('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: int('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$onUpdateFn(() => new Date()),
})
