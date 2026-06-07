import { globalStyles } from '@/common/style/globals'
import MealItem from '@/components/home/meal-item'
import { useWatchMeals } from '@/hooks/meals/use-watch-meals'
import { FlatList, Text } from 'react-native'

export default function MealsScreen() {
  const { meals } = useWatchMeals()

  return (
    <FlatList
      contentInsetAdjustmentBehavior="always"
      style={[globalStyles.container]}
      ListHeaderComponent={<Text style={[globalStyles.title, { marginBottom: 30 }]}>All Meals</Text>}
      data={meals}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={globalStyles.empty}>No meals logged yet.</Text>}
      renderItem={({ item: meal }) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          calories={meal.calories}
          protein={meal.protein}
          carbs={meal.carbs}
          fat={meal.fat}
        />
      )}
    />
  )
}
