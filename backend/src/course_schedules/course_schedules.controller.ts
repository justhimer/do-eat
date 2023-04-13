import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
  async datesWithCourses(@Body() body: DatesWithCoursesDto){
    const unprocessedData =  await this.courseSchedulesService.getDatesWithCourses(body.gyms)
    let processedData = []
    unprocessedData.forEach(elem=>{
      if(!processedData.some(i=> isSameDay(elem.time,i.date)))
      processedData.push({date:elem.time,marked:true})
    })
    return processedData
  }

  @Post('users/onDay')
  async coursesOnDay(@Body() body: DatesWithCoursesDto){
    const data =  await this.courseSchedulesService.someCoursesTimed(body.gyms,body.time)
    return data
  }

  // used as a test to check if the courseSchedulesService.getDateTime return a valid time string
  @Post('dateTime/:id')
  async courseDateTime(@Param('id',ParseIntPipe) courseSchedule_id:number ){
    const data = await this.courseSchedulesService.getDateTime(courseSchedule_id)
    console.log('courseSchedule dateTime: ', data)
    console.log('courseSchedule dateTime type: ', typeof data)
    return data
  }


}
