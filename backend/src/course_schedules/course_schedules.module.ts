import { Global, Module } from '@nestjs/common';
import { CourseSchedulesService } from './course_schedules.service';
import { CourseSchedulesController } from './course_schedules.controller';
import { PrismaService } from 'nestjs-prisma';
import { UserSchedulesService } from 'src/user_schedules/user_schedules.service';
import { UserSchedulesModule } from 'src/user_schedules/user_schedules.module';

@Global()
@Module({
  controllers: [CourseSchedulesController],
  providers: [CourseSchedulesService,PrismaService],
  exports: [CourseSchedulesService]
})
export class CourseSchedulesModule {}
