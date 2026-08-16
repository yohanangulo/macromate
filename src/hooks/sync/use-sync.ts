import { syncService } from '@/di/container'
import { useEffect } from 'react'

interface UseSyncParams {
  enabled: boolean
}

export function useSync({ enabled }: UseSyncParams) {
  useEffect(() => {
    if (!enabled) return

    void syncService.sync()
  }, [enabled])
}
