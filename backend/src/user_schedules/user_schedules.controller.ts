import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotAcceptableException, BadRequestException, UnauthorizedException, Request, UseGuards, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserSchedulesService } from './user_schedules.service';
import { CreateUserScheduleDto } from './dto/create-user_schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user_schedule.dto';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CourseSchedulesService } from 'src/course_schedules/course_schedules.service';
import { differenceInHours } from 'date-fns';
import { CalorieTransactionService } from 'src/calorie-transaction/calorie-transaction.service';


interface TakeAttendanceData {
  course_schedule_id: number,
  user_id: number
}

@ApiTags('userSchedules') // to categorize in swagger
@Controller('userSchedules')
export class UserSchedulesController {
  constructor(
    private readonly userSchedulesService: UserSchedulesService,
    private readonly creditService: CreditTransactionService,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly courseScheduleService: CourseSchedulesService,
    private readonly calorieTransactionService: CalorieTransactionService
  ) { }

  @Post('remaining/:course')
  async getSlots(@Param('course') course: number) {
    return await this.userSchedulesService.getRemainingSlots(course)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('coming')
  async findAllComing(@Request() req) {
    const userId = req.user.id;
    return await this.userSchedulesService.findAllUserCoursesComing(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  async findAllHistory(@Request() req) {
    const userId = req.user.id;

    // mark not pending classes absent
    let absentIDs = await this.userSchedulesService.findAbsentClassIDs(userId);
    for (let absentID of absentIDs) {
      await this.userSchedulesService.labelAbsent(absentID.id);
    }

    // get classes again
    return await this.userSchedulesService.findAllUserCoursesHistory(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('join/:course/')
  async join(@Param('course', ParseIntPipe) course: number, @Request() req) {
    const id = req.user.id;
    console.log('register to course')
    try {
      // check to see if already registered to course
      if (await this.userSchedulesService.findUserinCourse(id, course)) {
        return new HttpException('Already registered to course', HttpStatus.BAD_REQUEST)
        return;
      }
      // check to see if there are any remaining slots for course, returns error 400 if filled
      if (await this.userSchedulesService.getRemainingSlots(course) <= 0) {
        return new HttpException('No remaining slots', HttpStatus.BAD_REQUEST)
        return;
      }

      //if there are empty slots
      if (await this.usersService.findIsUnlimited(id)) {
        // checks if user has unlimited credit plan (premium user)

        // returns message course subscribed if ok
        return this.userSchedulesService.addCoursePremium(id, course)
      } else {

        //gets credits of user and required course credit
        let userCredit = await this.creditService.getUserCredits(id)
        let courseCredit = await this.coursesService.getExerciseCredit(course)

        //if not enough credits, throw error
        if (courseCredit > userCredit) {
          return new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Not Enough Credits' }, HttpStatus.BAD_REQUEST)
          return
        }

        // returns message course subscribed if ok
        return await this.userSchedulesService.addCourse(id, course)
      }
    } catch (error) {
      console.log(error)
    }

  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('cancel/:registeredCourse')
  async cancel(@Request() req, @Param('registeredCourse', ParseIntPipe) registeredCourse: number) {
    const userId = req.user.id;
    // console.log('registeredCourse: ', registeredCourse);
    const userSchedule = await this.userSchedulesService.returnUserIdCourse(registeredCourse)
    if (userId == userSchedule.user_id) {
      const courseTime = new Date(await this.courseScheduleService.getDateTime(userSchedule.course_schedule_id))
      const nowTime = new Date()
      const timeDifference = differenceInHours(courseTime, nowTime)
      if (timeDifference <= 24) {
        throw new ForbiddenException('24 hours or less until course starts', { cause: new Error() });
      } else {
        return { data: await this.userSchedulesService.deleteUserFromCourse(registeredCourse) }
      }

    } else {
      throw new UnauthorizedException('Not authorized user to delete course', { cause: new Error() })
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Patch('gym/take_attendance')
  async takeAttendance(@Request() req, @Body() takeAttendanceData: TakeAttendanceData) {
    const gymID = req.user.id;
    const canTakeAttendance = await this.userSchedulesService.findCanUserTakeAttendance(
      takeAttendanceData.user_id,
      takeAttendanceData.course_schedule_id,
      gymID
    );
    if (!canTakeAttendance) {
      throw new HttpException('No attendance to be taken', HttpStatus.BAD_REQUEST)
    }
    const user_schedule_id = await this.userSchedulesService.findUniqueUserScheduleID(
      takeAttendanceData.user_id,
      takeAttendanceData.course_schedule_id,
      gymID
    );
    await this.userSchedulesService.takeAttendance(user_schedule_id);
    const calorieGained = await this.userSchedulesService.findCalorieGain(user_schedule_id);
    await this.calorieTransactionService.createTransaction({
      user_id: takeAttendanceData.user_id,
      calorie: calorieGained,
      transaction_type_id: 1,
      user_schedule_id: user_schedule_id
    });
    return {
      msg: `User #${takeAttendanceData.user_id} has attended to class #${takeAttendanceData.course_schedule_id}`
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/find_attendance/:course_schedule_id')
  async findAttendedUsers(@Param('course_schedule_id', ParseIntPipe) course_schedule_id: number) {
    const attendedUsers = await this.userSchedulesService.findAllAttendedUsers(course_schedule_id);
    return attendedUsers;
  }

}


