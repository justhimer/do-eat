import { Module } from '@nestjs/common';
import { FoodHistoryService } from './food_history.service';
import { FoodHistoryController } from './food_history.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [FoodHistoryController],
  providers: [FoodHistoryService, PrismaService]
})
export class FoodHistoryModule {}
