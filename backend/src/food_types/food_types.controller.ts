import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodTypesService } from './food_types.service';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('food-types') // to categorize in swagger
@Controller('food-types')
export class FoodTypesController {
  constructor(private readonly foodTypesService: FoodTypesService) {}

  @Post()
  create(@Body() createFoodTypeDto: CreateFoodTypeDto) {
    return this.foodTypesService.create(createFoodTypeDto);
  }

  @Get()
  async findAll() {
    return await this.foodTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodTypeDto: UpdateFoodTypeDto,
  ) {
    return this.foodTypesService.update(+id, updateFoodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodTypesService.remove(+id);
  }
}
