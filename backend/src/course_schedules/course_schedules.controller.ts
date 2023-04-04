import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CourseSchedulesService } from './course_schedules.service';
import { DatesWithCoursesDto } from './dto/DatesWithCourses.dto';
import { CourseSchedules } from './entities/CourseSchedules.entities';
import { format, isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { UserSchedulesService } from 'src/user_schedules/user_schedules.service';
import * as _ from 'lodash'
import * as flatten from 'flat'


@ApiTags('coursesSchedules') // to categorize in swagger
@Controller('coursesSchedules')
export class CourseSchedulesController {
  constructor(private readonly courseSchedulesService: CourseSchedulesService, private readonly userScheduleService: UserSchedulesService) {}

  @Post('users/dates')
  async datesWithCourses(@Body() diu: DatesWithCoursesDto){
    console.log("gyms param", diu.gyms)
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
    const test =  await this.courseSchedulesService.someCoursesTimed(diu.gyms,diu.time)
    let newArray = []
    test.forEach((elem, index)=>{
      newArray.push(
        {
          course_id:elem.course_id,
          name:elem.courses.name,
          duration:elem.courses.duration,
          level:elem.courses.intensity.level,
          quota:elem.quota,
          time:elem.time,
          calorise:elem.courses.calorise,
          credits:elem.courses.credits,
          franchise:elem.courses.gyms.franchise.name,
          gym:elem.courses.gyms.name,
          trainer_icon:elem.trainers.icon,
          trainer_name:elem.trainers.name
        }
      )
    })
    return newArray
  }
}
