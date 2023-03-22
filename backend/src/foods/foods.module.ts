import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService, PrismaService],
})
export class FoodsModule {}
