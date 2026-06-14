import { colors, globalStyles } from '@/common/style/globals'
import { MealForm } from '@/components/meals/meal-form'
import { AddMealOutputSchema, MealEntity } from '@/core/meals/domain'
import { getMealById, updateMeal } from '@/di/container'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'

export default function MealDetail() {
  const [meal, setMeal] = useState<MealEntity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useLocalSearchParams<{ id: string }>()

  const handleFormSubmit = async ({ data }: { data: AddMealOutputSchema }) => {
    try {
      await updateMeal(id, data)
      Alert.alert('Success', 'Meal updated successfully', [{ text: 'OK', onPress: router.back }])
    } catch (e) {
      Alert.alert('Error', 'Could not save the meal. Please try again.')
    }
  }

  useEffect(() => {
    getMealById(id)
      .then(setMeal)
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  if (!meal) {
    return (
      <View style={styles.stateContainer}>
        <Text style={{ color: colors.textSecondary }}>Meal not found</Text>
      </View>
    )
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Edit Meal</Text>
      <MealForm meal={meal} onFormSubmit={handleFormSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  stateContainer: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
