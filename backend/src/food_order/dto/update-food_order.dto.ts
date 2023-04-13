import { PartialType } from '@nestjs/swagger';
import { CreateFoodOrderDto } from './create-food_order.dto';

export class UpdateFoodOrderDto extends PartialType(CreateFoodOrderDto) {}
