import { type AxiosInstance } from 'axios'
import { MealEntity } from '../../domain'

export class MealRemoteDataSource {
  constructor(private client: AxiosInstance) {}

  async save(meal: MealEntity): Promise<void> {
    await this.client.post('/meals', meal)
  }

  async fetchAll(): Promise<MealEntity[]> {
    const { data } = await this.client.get<MealEntity[]>('/meals')
    return data
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`/meals/${id}`)
  }
}
