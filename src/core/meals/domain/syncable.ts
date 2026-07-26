export type ConflictResolved = 'remote' | 'local'

export function resloveConflictLWW({
  localUpdatedAt,
  remoteUpdatedAt,
}: {
  localUpdatedAt: Date
  remoteUpdatedAt: Date
}): ConflictResolved {
  if (remoteUpdatedAt > localUpdatedAt) return 'remote'

  return 'local'
}

export abstract class Syncable<T> {
  abstract getUnsynced(): Promise<T[]>

  abstract upsertSynced(syncables: T[]): Promise<T[]>

  abstract markAsSynced(syncables: T[]): Promise<T[]>

  abstract sync(): Promise<void>
}
