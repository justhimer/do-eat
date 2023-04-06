import { Global, Module } from '@nestjs/common';
import { CourseSchedulesService } from './course_schedules.service';
import { CourseSchedulesController } from './course_schedules.controller';
import { PrismaService } from 'nestjs-prisma';


@Global()
@Module({
  controllers: [CourseSchedulesController],
  providers: [CourseSchedulesService,PrismaService,],
  exports: [CourseSchedulesService]
})
export class CourseSchedulesModule {}
