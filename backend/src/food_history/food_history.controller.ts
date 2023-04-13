import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { isError } from 'lodash';

@ApiTags('food-history')
@Controller('food-history')
export class FoodHistoryController {
  constructor(private readonly foodHistoryService: FoodHistoryService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/to_collect')
  async findFoodsToBeCollectedForUser(@Request() req) {
    const userID = req.user.id;
    const foodsToBeCollected = await this.foodHistoryService.findFoodsToBeCollectedForUser(userID);
    return foodsToBeCollected;
  }

  @Post()
  create(@Body() createFoodHistoryDto: CreateFoodHistoryDto) {
    return this.foodHistoryService.create(createFoodHistoryDto);
  }

  @Get('gym/:gym_id')
  async findOne(@Param('gym_id', ParseIntPipe) gym_id: number) {
    const data = await this.foodHistoryService.findOrdersForGyms(gym_id);
    if (!isError(data)) {
      const newData = []
      data.forEach(order => {
        const foodsInOrder = []
        order.FoodOrder.forEach(food => {
          foodsInOrder.push({
            food_id: food.id,
            quantity: food.quantity,
            name: food.food.name,
            image: food.food.image
          })
        })
        newData.push({
          order_id: order.id,
          user_id: order.user_id,
          user: order.user.username,
          collection_status: order.collection_status,
          foodOrder: foodsInOrder
        })
      })
      return newData
    } else {
      throw new BadRequestException('Bad Request', { cause: new Error() })
    }
  }

}
