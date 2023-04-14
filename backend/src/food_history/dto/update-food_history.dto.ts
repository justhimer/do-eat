import { PartialType } from '@nestjs/swagger';
import { CreateFoodHistoryDto } from './create-food_history.dto';

export class UpdateFoodHistoryDto extends PartialType(CreateFoodHistoryDto) {}
