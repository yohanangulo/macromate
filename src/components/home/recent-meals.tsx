import { dimens } from '@/common/dimens'
import { globalStyles } from '@/common/style/globals'
import { useWatchRecentMeals } from '@/hooks/meals/use-watch-recent-meals'
import { Text, View } from 'react-native'
import MealItem from './meal-item'

export default function RecentMeals() {
  const { meals } = useWatchRecentMeals()
  return (
    <View style={{ marginTop: 30, paddingBottom: dimens.p4 }}>
      <Text style={globalStyles.sectionTitle}>Recent Meals</Text>
      {meals.length === 0 ? (
        <Text style={globalStyles.empty}>No meals logged yet.</Text>
      ) : (
        meals.map(meal => (
          <MealItem
            key={meal.id}
            name={meal.name}
            calories={meal.calories}
            protein={meal.protein}
            carbs={meal.carbs}
            fat={meal.fat}
            id={meal.id}
          />
        ))
      )}
    </View>
  )
}
