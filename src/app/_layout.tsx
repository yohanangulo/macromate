import { Providers } from '@/common/providers/providers'
import { colors } from '@/common/style/globals'
import { useSync } from '@/hooks/sync/use-sync'
import { db, expoDb } from '@/infrastructure/db/client'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { Stack } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import migrations from '../../drizzle/migrations'

export default function RootLayout() {
  const { error, success } = useMigrations(db, migrations)
  useDrizzleStudio(expoDb)
  useSync({ enabled: success })

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred</Text>
      </View>
    )

  if (!success) return <ActivityIndicator />

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="meal/[id]"
          options={{
            headerShown: false,
            presentation: 'formSheet',
            sheetGrabberVisible: true,
            sheetAllowedDetents: 'fitToContents',
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </Stack>
    </Providers>
  )
}
