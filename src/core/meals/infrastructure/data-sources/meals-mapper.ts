import { MealEntity } from '../../domain'
import { MealDto } from '../dto/meal-dto'
import { MealModel } from '../models/meal-model'

function fromModel(model: MealModel): MealEntity {
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

function toDto(entity: MealEntity, { isDeleted = false } = {}): MealDto {
  return {
    id: entity.id,
    name: entity.name,
    calories: entity.calories,
    protein: entity.protein,
    carbs: entity.carbs,
    fat: entity.fat,
    isDeleted: isDeleted,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  }
}

function fromDto(dto: MealDto): MealEntity {
  return new MealEntity({
    id: dto.id,
    name: dto.name,
    calories: dto.calories,
    protein: dto.protein,
    carbs: dto.carbs,
    fat: dto.fat,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  })
}

export const mealsMapper = { fromModel, toModel, toDto, fromDto }
