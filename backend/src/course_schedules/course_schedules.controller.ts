import { Controller } from '@nestjs/common';
import { CourseSchedulesService } from './course_schedules.service';

@Controller('course-schedules')
export class CourseSchedulesController {
  constructor(private readonly courseSchedulesService: CourseSchedulesService) {}
}
