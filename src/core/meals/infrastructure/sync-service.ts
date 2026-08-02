import { Syncable } from '../domain/syncable'

export class SyncService {
  constructor(private syncables: Syncable[]) {}

  async sync(): Promise<void> {
    for (const syncable of this.syncables) {
      await syncable.sync()
    }
  }
}
