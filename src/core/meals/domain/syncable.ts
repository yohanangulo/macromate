export type ConflictResolved = 'remote' | 'local'

export function resolveConflictLWW({
  localUpdatedAt,
  remoteUpdatedAt,
}: {
  localUpdatedAt: Date
  remoteUpdatedAt: Date
}): ConflictResolved {
  if (remoteUpdatedAt > localUpdatedAt) return 'remote'

  return 'local'
}

export abstract class Syncable {
  abstract sync(): Promise<void>
}
