import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('food-history')
@Controller('food-history')
export class FoodHistoryController {
  constructor(private readonly foodHistoryService: FoodHistoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('collect')
  async findAllNotCollected(@Request() req) {
    const userID = req.user.id;
    const foodsToBeCollected = await this.foodHistoryService.findAllNotCollected(userID);
    return foodsToBeCollected;
  }

  @Post()
  create(@Body() createFoodHistoryDto: CreateFoodHistoryDto) {
    return this.foodHistoryService.create(createFoodHistoryDto);
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
