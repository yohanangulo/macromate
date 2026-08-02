import { MealDto } from './meal-dto'

export interface GetMealsDto {
  syncTimestamp: string | null
  meals: MealDto[]
}
