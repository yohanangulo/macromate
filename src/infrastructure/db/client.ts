import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import * as schema from './schema'

export const expoDb = openDatabaseSync('macromate.db', { enableChangeListener: true })

export const db = drizzle(expoDb, { schema })

export type AppDatabase = typeof db
