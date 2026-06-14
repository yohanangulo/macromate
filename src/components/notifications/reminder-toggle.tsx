import { colors } from '@/common/style/globals'
import {
  cancelMealReminders,
  ensureNotificationPermission,
  openNotificationSettings,
  scheduleMealReminders,
} from '@/utils/notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Switch, Text, View } from 'react-native'

const REMINDERS_KEY = 'remindersEnabled'

export default function ReminderToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const load = async () => {
      const val = await AsyncStorage.getItem(REMINDERS_KEY)
      setEnabled(val === 'true')
    }
    load()
  }, [])

  const toggle = async (value: boolean) => {
    if (!value) {
      await cancelMealReminders()
      setEnabled(false)
      await AsyncStorage.setItem(REMINDERS_KEY, 'false')
      return
    }

    const permission = await ensureNotificationPermission()

    if (permission === 'blocked') {
      Alert.alert('Notifications are off', 'Enable notifications in Settings to receive meal reminders.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openNotificationSettings() },
      ])
      return
    }

    if (permission === 'denied') return

    await scheduleMealReminders()
    setEnabled(true)
    await AsyncStorage.setItem(REMINDERS_KEY, 'true')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Reminders</Text>
      <Switch value={enabled} onValueChange={toggle} trackColor={{ false: colors.surface, true: colors.primary }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    color: colors.text,
    fontSize: 16,
  },
})
