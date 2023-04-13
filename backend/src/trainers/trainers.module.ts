import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService,PrismaService]
})
export class TrainersModule {}
