import { OmitType } from '@nestjs/swagger';
import { Food } from '../entities/food.entity';

export class CreateFoodDto extends OmitType(Food, ['id'] as const) {}
