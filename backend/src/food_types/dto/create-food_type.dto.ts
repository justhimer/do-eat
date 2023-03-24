import { OmitType } from '@nestjs/swagger';
import { FoodType } from '../entities/food_type.entity';

export class CreateFoodTypeDto extends OmitType(FoodType, ['id'] as const) {}
