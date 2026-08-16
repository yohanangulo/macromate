import { Syncable } from '../domain/syncable'

export class SyncService {
  private isSyncing: boolean = false

  constructor(private syncables: Syncable[]) {}

  async sync(): Promise<void> {
    if (this.isSyncing) return
    this.isSyncing = true

    try {
      for (const syncable of this.syncables) {
        await syncable.sync()
      }
    } finally {
      this.isSyncing = false
    }
  }
}
