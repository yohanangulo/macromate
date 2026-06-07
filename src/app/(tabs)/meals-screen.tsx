import { globalStyles } from '@/common/style/globals'
import { useWatchMeals } from '@/hooks/meals/use-watch-meals'
import { ScrollView, Text } from 'react-native'

export default function MealsScreen() {
  const { meals } = useWatchMeals()
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Meals</Text>
      <Text>{JSON.stringify(meals, null, 2)}</Text>
    </ScrollView>
  )
}
