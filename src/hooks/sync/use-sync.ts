import { syncService } from '@/di/container'
import * as Network from 'expo-network'
import { useEffect } from 'react'

interface UseSyncParams {
  enabled: boolean
}

export function useSync({ enabled }: UseSyncParams) {
  useEffect(() => {
    if (!enabled) return

    void syncService.sync()
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    let wasOnline: boolean | null = null

    const subscription = Network.addNetworkStateListener(({ isConnected, isInternetReachable }) => {
      const online = Boolean(isConnected && isInternetReachable !== false)

      if (online && wasOnline === false) {
        void syncService.sync()
      }

      wasOnline = online
    })

    return () => subscription.remove()
  }, [enabled])
}
