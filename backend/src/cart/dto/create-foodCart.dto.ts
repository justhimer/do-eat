import { OmitType, PartialType } from '@nestjs/swagger';
import { FoodCart } from '../entities/foodCart.entity';


export class CreateFoodCartDto extends OmitType(FoodCart, ['id'] as const) { }

