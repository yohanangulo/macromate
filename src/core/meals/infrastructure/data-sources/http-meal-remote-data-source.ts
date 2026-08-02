import { AxiosError, type AxiosInstance } from 'axios'
import { GetMealsDto } from '../dto/get-meals-dto'
import { MealDto } from '../dto/meal-dto'

export class MealRemoteDataSource {
  constructor(private client: AxiosInstance) {}

  async fetchMeal(id: string): Promise<MealDto | null> {
    try {
      const { data: meal } = await this.client.get<MealDto>(`/meals/${id}`)

      return meal
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            return null
        }
      }

      throw error
    }
  }

  async fetchAll(): Promise<MealDto[]> {
    const {
      data: { meals },
    } = await this.client.get<GetMealsDto>('/meals/sync')

    return meals
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`/meals/${id}`)
  }

  async saveMany(meals: MealDto[]): Promise<void> {
    await this.client.post('/meals/sync', { meals })
  }

  async save(meal: MealDto): Promise<void> {
    await this.client.post('/meals/sync', { meals: [meal] })
  }

  async fetchMealsSynce(date?: Date | null): Promise<GetMealsDto> {
    const { data } = await this.client.get<GetMealsDto>('/meals/sync', { params: { since: date } })

    return data
  }

  async clearAll(): Promise<void> {
    await this.client.delete('/meals')
  }
}
