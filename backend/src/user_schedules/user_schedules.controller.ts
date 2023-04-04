import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotAcceptableException, BadRequestException, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { UserSchedulesService } from './user_schedules.service';
import { CreateUserScheduleDto } from './dto/create-user_schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user_schedule.dto';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usersSchedules') // to categorize in swagger
@Controller('userSchedules')
export class UserSchedulesController {
  constructor(
    private readonly userSchedulesService: UserSchedulesService,
    private readonly creditService: CreditTransactionService,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService
    ) {}

    @Post('remaining/:course')
    async getSlots(@Param('course') course: number){
      return await this.userSchedulesService.getRemainingSlots(course)
    }

    @Post('join/:course/:id')
    async join(@Param('course', ParseIntPipe) course: number, @Param('id', ParseIntPipe) id: number) {
      // check to see if already registered to course
      if (await this.userSchedulesService.findUserinCourse(id, course)) {
        throw new NotAcceptableException('Already registered to course', { cause: new Error() });
        return;
      }
      // check to see if there are any remaining slots for course, returns error 400 if filled
      if (await this.userSchedulesService.getRemainingSlots(course) <= 0) {
        throw new BadRequestException('No remaining slots left in course', { cause: new Error() });
        return;
      }
  
      //if there are empty slots
      if (await this.usersService.findIsUnlimited(id)) {
        // checks if user has unlimited credit plan (premium user)
        console.log("register as premium user");
        // returns message course subscribed if ok
        return this.userSchedulesService.addCoursePremium(id, course)
      } else {
        console.log("register as basic user");
        //gets credits of user and required course credit
        let userCredit = await this.creditService.getUserCredits(id)
        let courseCredit = await this.coursesService.getExerciseCredit(course)
  
        //if not enough credits, throw error
        if (courseCredit > userCredit) {
          throw new BadRequestException('Not Enough Credits', { cause: new Error() })
          return
        }
  
        // returns message course subscribed if ok
        return await this.userSchedulesService.addCourse(id, course)
      }
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Post('cancel/:registeredCourse/')
    async cancel(@Request() req, @Param('registeredCourse', ParseIntPipe) course: number) {
      const userId = req.user.id
      if (userId == this.userSchedulesService.returnUserIdCourse(course)) {
        return await this.userSchedulesService.deleteUserFromCourse(course)
      }else{
        throw new UnauthorizedException('Not authorized user to delete course', { cause: new Error() })
      }
    }
}
