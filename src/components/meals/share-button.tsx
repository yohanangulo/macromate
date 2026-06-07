import { colors } from '@/common/style/globals'
import { buildSummaryTotal } from '@/core/shared/helpers'
import { useWatchMealsTotals } from '@/hooks/meals/use-watch-meals-totals'
import { Ionicons } from '@expo/vector-icons'
import { Share, TouchableOpacity } from 'react-native'

export default function ShareButton() {
  const { totals } = useWatchMealsTotals()
  const handleShare = async () => {
    await Share.share({ message: buildSummaryTotal(totals) })
  }

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  )
}
