import { colors } from '@/common/style/globals'
import { buildSummaryTotal } from '@/core/shared/helpers'
import { useWatchMealsTotals } from '@/hooks/meals/use-watch-meals-totals'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function CopyButton() {
  const { totals } = useWatchMealsTotals()

  const handleCopy = async () => {
    const summary = buildSummaryTotal(totals)
    await Clipboard.setStringAsync(summary)
    Alert.alert('Copied!', 'Macro summary copied to clipboard.')
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
})
