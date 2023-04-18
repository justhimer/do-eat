import { Global, Module } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { FoodHistoryController } from './food_history.controller';
import { PrismaService } from 'nestjs-prisma';
import { FoodOrderService } from 'src/food_order/food_order.service';
import { FoodCartService } from 'src/cart/foodCart.service';
import { FoodsService } from 'src/foods/foods.service';
import { CalorieTransactionService } from 'src/calorie-transaction/calorie-transaction.service';

// @Global()
@Module({
  controllers: [FoodHistoryController],
  providers: [FoodHistoryService, PrismaService, FoodOrderService, FoodCartService, FoodsService, CalorieTransactionService]
})
export class FoodHistoryModule { }
