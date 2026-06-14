import * as Notifications from 'expo-notifications'
import { Linking, Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const ANDROID_CHANNEL_ID = 'meal-reminders'

export type NotificationPermissionResult = 'granted' | 'denied' | 'blocked'

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Meal reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
  })
}

export async function ensureNotificationPermission(): Promise<NotificationPermissionResult> {
  await ensureAndroidChannel()

  const current = await Notifications.getPermissionsAsync()

  const isProvisional = current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  if (current.granted || isProvisional) return 'granted'

  if (current.canAskAgain) {
    const requested = await Notifications.requestPermissionsAsync()
    if (requested.granted) return 'granted'
    return requested.canAskAgain ? 'denied' : 'blocked'
  }

  return 'blocked'
}

export function openNotificationSettings() {
  return Linking.openSettings()
}

export async function scheduleMealReminders() {
  await cancelMealReminders()

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: "Don't forget to log your lunch!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 12,
      minute: 0,
      channelId: ANDROID_CHANNEL_ID,
    },
  })

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: 'Time to log your dinner!',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
      channelId: ANDROID_CHANNEL_ID,
    },
  })
}

export async function cancelMealReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
