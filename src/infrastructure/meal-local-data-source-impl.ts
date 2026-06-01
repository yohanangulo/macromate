import { MealEntity, MealLocalDataSource } from '@/core/meals/domain'

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
