import { MealEntity } from '@/core/meals/domain'
import { MealLocalDataSource } from '@/core/meals/infrastructure'

export class MealLocalDataSourceImpl implements MealLocalDataSource {
  async save(meal: MealEntity): Promise<void> {
    //
  }

  async getAll(): Promise<MealEntity[]> {
    return []
  }

  async delete(id: string): Promise<void> {
    //
  }
}
