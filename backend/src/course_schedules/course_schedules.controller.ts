import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CourseSchedulesService } from './course_schedules.service';
import { DatesWithCoursesDto } from './dto/DatesWithCourses.dto';
import { CourseSchedules } from './entities/CourseSchedules.entities';
import { format, isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { UserSchedulesService } from 'src/user_schedules/user_schedules.service';
import { CourseSchedulesGymDto } from './dto/CourseScheduleGym.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseSchedulesDTO } from './dto/CreateCourseSchedules.dto';


@ApiTags('coursesSchedules') // to categorize in swagger
@Controller('coursesSchedules')
export class CourseSchedulesController {
  constructor(
    private readonly courseSchedulesService: CourseSchedulesService,
    private readonly userScheduleService: UserSchedulesService
  ) { }

  @Get('course-name/:course_schedule_id')
  async findCourseName(@Param('course_schedule_id', ParseIntPipe) course_schedule_id: number) {
    return await this.courseSchedulesService.findCourseName(course_schedule_id);
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/24hrs')
  async findCoursesInNext24Hours(@Request() req) {
    const gymID = req.user.id;
    const courses = await this.courseSchedulesService.findCoursesInNext24Hours(gymID);
    for (let course of courses) {
      course["slot"] = await this.userScheduleService.getFilledSlots(course.id);
    }
    return courses;
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/coming')
  async findComingCourse(@Request() req) {
    const gymID = req.user.id;
    const course = await this.courseSchedulesService.findComingtCourse(gymID);
    return course;
  }

  @Post('users/dates')
  async datesWithCourses(@Body() body: DatesWithCoursesDto) {
    const unprocessedData = await this.courseSchedulesService.getDatesWithCourses(body.gyms)
    let processedData = []
    unprocessedData.forEach(elem => {
      if (!processedData.some(i => isSameDay(elem.time, i.date)))
        processedData.push({ date: elem.time, marked: true })
    })
    return processedData
  }

  @Post('users/onDay')
  async coursesOnDay(@Body() body: CourseSchedulesGymDto) {
    const data = await this.courseSchedulesService.someCoursesTimed(body.gyms, body.time)
    return data
  }

  // used as a test to check if the courseSchedulesService.getDateTime return a valid time string
  @Post('dateTime/:id')
  async courseDateTime(@Param('id', ParseIntPipe) courseSchedule_id: number) {
    const data = await this.courseSchedulesService.getDateTime(courseSchedule_id)
    return data
  }

  @Get('gym/course/schedule/:course_id')
  async gymSoloCourseSchedule(@Param('course_id', ParseIntPipe) course_id, @Req() req): Promise<any[] | Error> {
    return await this.courseSchedulesService.getAllScheduleForGymCourse(course_id)
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('gym/create/courseSchedule')
  async createSchedule(@Body() body: CreateCourseSchedulesDTO) {
    try {
      console.log('create course schedule')
      return await this.courseSchedulesService.createNewCourseTime(body)
    } catch (error) {
      throw new Error(error)
    }

  }

}
