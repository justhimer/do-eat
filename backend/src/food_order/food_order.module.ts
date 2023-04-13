import { Module } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { FoodOrderController } from './food_order.controller';

@Module({
  controllers: [FoodOrderController],
  providers: [FoodOrderService]
})
export class FoodOrderModule {}
