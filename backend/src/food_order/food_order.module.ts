import { Module } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { FoodOrderController } from './food_order.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [FoodOrderController],
  providers: [FoodOrderService, PrismaService]
})
export class FoodOrderModule {}
