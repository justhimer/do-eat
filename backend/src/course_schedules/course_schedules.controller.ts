import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CourseSchedulesService } from './course_schedules.service';
import { diuDto } from './dto/diu.dto';


@ApiTags('coursesSchedules') // to categorize in swagger
@Controller('coursesSchedules')
export class CourseSchedulesController {
  constructor(private readonly courseSchedulesService: CourseSchedulesService) {}

  @Post('')
  async coursesOnDay(@Body() diu: diuDto){
    console.log(diu.gyms)
    console.log(diu.time)
    return await this.courseSchedulesService.someCoursesTimed(diu.gyms,diu.time)
  }
}
