import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('food-history')
export class FoodHistoryController {
  constructor(private readonly foodHistoryService: FoodHistoryService) {}

  @Post()
  create(@Body() createFoodHistoryDto: CreateFoodHistoryDto) {
    return this.foodHistoryService.create(createFoodHistoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllNotCollected(@Request() req) {
    const userID = req.user.id;
    const data = await this.foodHistoryService.findAllNotCollected(userID);
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodHistoryDto: UpdateFoodHistoryDto) {
    return this.foodHistoryService.update(+id, updateFoodHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodHistoryService.remove(+id);
  }
}
