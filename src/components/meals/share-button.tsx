import { colors } from '@/common/style/globals'
import { useWatchMealsTotals } from '@/hooks/meals/use-watch-meals-totals'
import { Ionicons } from '@expo/vector-icons'
import { Share, TouchableOpacity } from 'react-native'

export default function ShareButton() {
  const { totals } = useWatchMealsTotals()
  const handleShare = async () => {
    await Share.share({
      message: `MacroZone Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${totals.totalMeals} logged`,
    })
  }

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  )
}
