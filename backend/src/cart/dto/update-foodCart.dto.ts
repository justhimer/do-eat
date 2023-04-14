import { PartialType } from '@nestjs/swagger';
import { CreateFoodCartDto } from './create-foodCart.dto';

export class UpdateFoodCartDto extends PartialType(CreateFoodCartDto) { }
