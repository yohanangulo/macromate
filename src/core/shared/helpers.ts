export function buildSummaryTotal(totals: { calories: number; protein: number; carbs: number; fat: number; totalMeals: number }) {
  return `
    MacroZone Summary\n\n
    
    Calories: ${totals.calories}\n
    Protein: ${totals.protein}g\n
    Carbs: ${totals.carbs}g\n
    Fat: ${totals.fat}g\n\n

    Meals: ${totals.totalMeals} logged`
}
