import { globalStyles } from '@/common/style/globals'
import MealItem from '@/components/meals/meal-item'
import { clearAllMeals } from '@/di/container'
import { useWatchMeals } from '@/hooks/meals/use-watch-meals'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MealsScreen() {
  const { meals } = useWatchMeals()

  const handleClearAll = () => {
    Alert.alert('Clear All Meals', 'Are you sure you want to clear all meals?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: clearAllMeals,
      },
    ])
  }

  const header = (
    <View style={[globalStyles.header, { marginBottom: 30 }]}>
      <Text style={globalStyles.title}>All Meals</Text>
      <TouchableOpacity onPress={handleClearAll}>
        <Text style={styles.clearButton}>Clear All</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <FlatList
      contentInsetAdjustmentBehavior="always"
      style={[globalStyles.container]}
      ListHeaderComponent={header}
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

const styles = StyleSheet.create({
  clearButton: {
    fontSize: 16,
    color: 'red',
  },
})
