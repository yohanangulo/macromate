import { colors, globalStyles } from '@/common/style/globals'
import { AddMealOutputSchema, AddMealSchema, addMealSchema } from '@/core/meals/domain'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function AddMealScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMealSchema, any, AddMealOutputSchema>({
    resolver: zodResolver(addMealSchema),
    defaultValues: {
      name: '',
      calories: undefined as unknown as number,
      protein: undefined as unknown as number,
      carbs: undefined as unknown as number,
      fat: undefined as unknown as number,
    },
  })

  const handleAddMeal = (data: AddMealSchema) => {
    console.log(data)
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meal</Text>

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
              onChange(value.trim() ? Number(value) : undefined)
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
                onChange(value.trim() ? Number(value) : undefined)
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
                onChange(value.trim() ? Number(value) : undefined)
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
                onChange(value.trim() ? Number(value) : undefined)
              }}
            />
          )}
        />
      </View>

      {errors.protein && <Text style={styles.error}>{errors.protein.message}</Text>}
      {errors.carbs && <Text style={styles.error}>{errors.carbs.message}</Text>}
      {errors.fat && <Text style={styles.error}>{errors.fat.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleAddMeal)}>
        <Text style={styles.buttonText}>Add Meal</Text>
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
