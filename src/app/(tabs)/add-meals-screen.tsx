import { globalStyles } from '@/common/style/globals'
import { MealForm } from '@/components/meals/meal-form'
import { AddMealOutputSchema } from '@/core/meals/domain'
import { addMeal } from '@/di/container'
import { router } from 'expo-router'
import { Alert, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddMealScreen() {
  const handleFormSubmit = async ({ reset, data }: { reset: () => void; data: AddMealOutputSchema }) => {
    try {
      await addMeal(data)
      Alert.alert('Success', 'Meal added successfully')
      reset()
      router.navigate('/')
    } catch (e) {
      Alert.alert('Error', 'Could not save the meal. Please try again.')
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meal</Text>
      <MealForm onFormSubmit={handleFormSubmit} />
    </SafeAreaView>
  )
}
