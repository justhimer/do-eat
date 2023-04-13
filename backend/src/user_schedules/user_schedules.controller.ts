import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotAcceptableException, BadRequestException, UnauthorizedException, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserSchedulesService } from './user_schedules.service';
import { CreateUserScheduleDto } from './dto/create-user_schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user_schedule.dto';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('userSchedules') // to categorize in swagger
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

    @UseGuards(AuthGuard('jwt'))
    @Post('join/:course/')
    async join(@Param('course', ParseIntPipe) course: number, @Request() req) {
      const id = req.user.id
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
          return new HttpException({status:HttpStatus.BAD_REQUEST,error:'Not Enough Credits'},HttpStatus.BAD_REQUEST)
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
