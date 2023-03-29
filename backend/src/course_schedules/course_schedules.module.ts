import { Module } from '@nestjs/common';
import { CourseSchedulesService } from './course_schedules.service';
import { CourseSchedulesController } from './course_schedules.controller';

@Module({
  controllers: [CourseSchedulesController],
  providers: [CourseSchedulesService]
})
export class CourseSchedulesModule {}
