import { SafeAreaProvider } from 'react-native-safe-area-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>
}
