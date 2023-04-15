import { Module } from '@nestjs/common';
import { GymFoodStockService } from './gym-food-stock.service';
import { GymFoodStockController } from './gym-food-stock.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [GymFoodStockController],
  providers: [GymFoodStockService,PrismaService]
})
export class GymFoodStockModule {}
