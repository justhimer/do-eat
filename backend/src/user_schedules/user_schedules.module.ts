import { Module } from '@nestjs/common';
import { UserSchedulesService } from './user_schedules.service';
import { UserSchedulesController } from './user_schedules.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [UserSchedulesController],
  providers: [UserSchedulesService,PrismaService]
})
export class UserSchedulesModule {}
