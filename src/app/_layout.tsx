import { colors } from '@/common/style/globals'
import { db } from '@/infrastructure/db/client'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Stack } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import migrations from '../../drizzle/migrations'

export default function RootLayout() {
  const { error, success } = useMigrations(db, migrations)

  if (error)
    return (
      <View>
        <Text>An error occurred</Text>
      </View>
    )

  if (!success) return <ActivityIndicator />

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
