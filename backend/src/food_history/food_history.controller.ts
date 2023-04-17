import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, BadRequestException, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { isError } from 'lodash';
import { FoodOrderService } from 'src/food_order/food_order.service';
import { FoodCartService } from 'src/cart/foodCart.service';

interface FoodTakenData {
  user_id: number
}

@ApiTags('food-history')
@Controller('food-history')
export class FoodHistoryController {
  constructor(
    private readonly foodHistoryService: FoodHistoryService,
    private readonly foodOrderService: FoodOrderService,
    private readonly foodCartService: FoodCartService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/to_collect')
  async findFoodsToBeCollectedForUser(@Request() req) {
    const userID = req.user.id;
    const foodsToBeCollected = await this.foodHistoryService.findFoodsToBeCollectedForUser(userID);
    return foodsToBeCollected;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/collected')
  async findFoodsCollectedByUser(@Request() req) {
    const userID = req.user.id;
    const foodsToBeCollected = await this.foodHistoryService.findFoodsCollectedByUser(userID);
    return foodsToBeCollected;
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/orders')
  async findFoodOrdersForGym(@Request() req) {
    const gymID = req.user.id;
    const foodOrders = await this.foodHistoryService.findFoodOrdersForGym(gymID);
    return foodOrders;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createFoodHistoryDto: CreateFoodHistoryDto) {
    try {

      const foodHistory = await this.foodHistoryService.createHistory(createFoodHistoryDto);

      if (foodHistory) {
        for (let foodOrder of createFoodHistoryDto.foodOrders) {
          console.log('foodOrder: ', foodOrder);
          const createdOrder = await this.foodOrderService.createOrder({
            food_id: foodOrder.food_id,
            quantity: foodOrder.quantity,
            food_history_id: foodHistory.id
          });
          if (createdOrder) {
            await this.foodCartService.deleteCart(foodOrder.cart_id);
          }
        }
      }

      return { msg: 'create food history success' };

    } catch (err) {
      return new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/')
  async findOne(@Req() req) {
    const gym_id = req.user.id;
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

  @UseGuards(AuthGuard('jwt_gym'))
  @Patch('gym/food_taken')
  async gymFoodTaken(@Req() req, @Body() foodTakenData: FoodTakenData) {
    try {
      const gym_id = req.user.id;
      const user_id = foodTakenData.user_id;
      await this.foodHistoryService.takenFood(user_id, gym_id);
      return { msg: `User #${user_id} has taken all food from gym #${gym_id}` }
    } catch (err) {
      return new HttpException('Fail to take food', HttpStatus.BAD_REQUEST)
    }
  }

}
