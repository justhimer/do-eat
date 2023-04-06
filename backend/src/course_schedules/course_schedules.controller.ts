import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CourseSchedulesService } from './course_schedules.service';
import { DatesWithCoursesDto } from './dto/DatesWithCourses.dto';
import { CourseSchedules } from './entities/CourseSchedules.entities';
import { format, isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { UserSchedulesService } from 'src/user_schedules/user_schedules.service';
import * as _ from 'lodash'


@ApiTags('coursesSchedules') // to categorize in swagger
@Controller('coursesSchedules')
export class CourseSchedulesController {
  constructor(private readonly courseSchedulesService: CourseSchedulesService, private readonly userScheduleService: UserSchedulesService) {}

  @Post('users/dates')
  async datesWithCourses(@Body() diu: DatesWithCoursesDto){
    const unprocessedData =  await this.courseSchedulesService.getDatesWithCourses(diu.gyms)
    let processedData = []
    unprocessedData.forEach(elem=>{
      if(!processedData.some(i=> isSameDay(elem.time,i.date)))
      processedData.push({date:elem.time,marked:true})
    })
    return processedData
  }

  @Post('users/onDay')
  async coursesOnDay(@Body() diu: CourseSchedules){
    const data =  await this.courseSchedulesService.someCoursesTimed(diu.gyms,diu.time)
    return data
  }
}
