import { PartialType } from '@nestjs/swagger';
import { CreateFoodTypeDto } from './create-food_type.dto';

export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {}
