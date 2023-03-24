import { Module } from '@nestjs/common';
import { FoodTypesService } from './food_types.service';
import { FoodTypesController } from './food_types.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [FoodTypesController],
  providers: [FoodTypesService, PrismaService],
})
export class FoodTypesModule {}
