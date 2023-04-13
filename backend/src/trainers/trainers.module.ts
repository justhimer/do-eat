import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { PrismaService } from 'nestjs-prisma';
import { GymsModule } from 'src/gyms/gyms.module';

@Module({
  imports: [GymsModule],
  controllers: [TrainersController],
  providers: [TrainersService,PrismaService],
  exports: [TrainersService]
})
export class TrainersModule {}
