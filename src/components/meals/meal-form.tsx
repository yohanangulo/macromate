import { colors } from '@/common/style/globals'
import { AddMealOutputSchema, AddMealSchema, addMealSchema, MealEntity } from '@/core/meals/domain'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

type Props = {
  meal?: MealEntity
  onFormSubmit: ({ reset, data }: { reset: () => void; data: AddMealOutputSchema }) => Promise<void>
}

export function MealForm({ meal, onFormSubmit }: Props) {
  const isEditing = !!meal

  let defaultValues = {
    name: '',
    calories: null as unknown as number,
    protein: null as unknown as number,
    carbs: null as unknown as number,
    fat: null as unknown as number,
  }

  if (isEditing) {
    defaultValues = {
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein === 0 ? (null as unknown as number) : meal.protein,
      carbs: meal.carbs === 0 ? (null as unknown as number) : meal.carbs,
      fat: meal.fat === 0 ? (null as unknown as number) : meal.fat,
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMealSchema, any, AddMealOutputSchema>({
    resolver: zodResolver(addMealSchema),
    defaultValues,
  })

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.input}
            placeholder="Meal name"
            autoCorrect={false}
            placeholderTextColor={colors.textSecondary}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="calories"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => {
              onChange(value.trim() ? Number(value) : null)
            }}
            value={value?.toString()}
            style={styles.input}
            placeholder="Calories"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
        )}
      />
      {errors.calories && <Text style={styles.error}>{errors.calories.message}</Text>}

      <View style={styles.row}>
        <Controller
          control={control}
          name="protein"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.rowInput]}
              onBlur={onBlur}
              placeholder="Protein (g)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={value => {
                onChange(value.trim() ? Number(value) : null)
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="carbs"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.rowInput]}
              onBlur={onBlur}
              placeholder="Carbs (g)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={value => {
                onChange(value.trim() ? Number(value) : null)
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="fat"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.rowInput]}
              onBlur={onBlur}
              placeholder="Fat (g)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={value => {
                onChange(value.trim() ? Number(value) : null)
              }}
            />
          )}
        />
      </View>

      {errors.protein && <Text style={styles.error}>{errors.protein.message}</Text>}
      {errors.carbs && <Text style={styles.error}>{errors.carbs.message}</Text>}
      {errors.fat && <Text style={styles.error}>{errors.fat.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(data => onFormSubmit({ reset, data }))}>
        <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Add Meal'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: colors.alert,
    marginTop: 8,
  },
})
