import { MealEntity } from '../../domain'
import { MealModel } from '../models/meal-model'

function toEntity(model: MealModel): MealEntity {
  return new MealEntity({
    id: model.id,
    name: model.name,
    calories: model.calories,
    protein: model.protein,
    carbs: model.carbs,
    fat: model.fat,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  })
}

function toModel(
  entity: MealEntity,
  {
    synced = false,
    isDeleted = false,
  }: {
    synced?: boolean
    isDeleted?: boolean
  } = {},
): MealModel {
  return {
    id: entity.id,
    name: entity.name,
    calories: entity.calories,
    protein: entity.protein,
    carbs: entity.carbs,
    fat: entity.fat,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    synced: synced,
    isDeleted: isDeleted,
  }
}

export const mealsMapper = { toEntity, toModel }
