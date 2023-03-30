import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('foods') // to categorize in swagger
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  findOne(@Param('id') id: string) {
=======
  async findOne(@Param('id') id: string) {
>>>>>>> 5f96b2319f6cf27537e3c874fcfd705b5f66c992
    return this.foodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}
