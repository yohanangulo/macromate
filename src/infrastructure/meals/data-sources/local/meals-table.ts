import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const mealsTable = sqliteTable('meals', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  calories: real('calories').notNull().default(0),
  protein: real('protein').notNull().default(0),
  carbs: real('carbs').notNull().default(0),
  fat: real('fat').notNull().default(0),

  synced: int('synced', { mode: 'boolean' }).notNull().default(false),
  isDeleted: int('is_deleted', { mode: 'boolean' }).notNull().default(false),

  createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).notNull(),
})
