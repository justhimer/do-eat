import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger, Query, HttpException, HttpStatus, BadRequestException, NotAcceptableException, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import {  ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { GymsService } from 'src/gyms/gyms.service';


/* responsible for the following tables:
user_schedules
*/

@ApiTags('exercises') // to categorize in swagger
@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService, 
    private readonly creditService: CreditTransactionService, 
    private readonly usersService: UsersService,
    private readonly gymService: GymsService
    ) { }


  @Get("all")
  async findAll() {
    
    return await this.exercisesService.allCourses()
  }

  @Get("some")
  async getDistrictLocations(@Body() districts: number[]) {
    return this.exercisesService.districtCourses(districts)
  }

  @Get("random")
  getRandomCourses() {

  }

  @Get("suggested")
  getSuggestedCourses() {

  }

  @Get("courses/:location/:date")
  getCoursesDates() {

  }

  @Get("details")
  getCourseDetails() {

  }

  @Post('join/:course/:id')
  async join(@Param('course', ParseIntPipe) course: number, @Param('id', ParseIntPipe) id: number) {
    // check to see if already registered to course
    if (await this.exercisesService.findUserinCourse(id, course)) {
      throw new NotAcceptableException('Already registered to course', { cause: new Error() });
      return;
    }
    // check to see if there are any remaining slots for course, returns error 400 if filled
    if (await this.exercisesService.getRemainingSlots(course) <= 0) {
      throw new BadRequestException('No remaining slots left in course', { cause: new Error() });
      return;
    }

    //if there are empty slots
    if (await this.usersService.findIsUnlimited(id)) {
      // checks if user has unlimited credit plan (premium user)
      console.log("register as premium user");
      // returns message course subscribed if ok
      return this.exercisesService.addCoursePremium(id, course)
    } else {
      console.log("register as basic user");
      //gets credits of user and required course credit
      let userCredit = await this.creditService.getUserCredits(id)
      let courseCredit = await this.exercisesService.getExerciseCredit(course)

      //if not enough credits, throw error
      if (courseCredit > userCredit) {
        throw new BadRequestException('Not Enough Credits', { cause: new Error() })
        return
      }

      // returns message course subscribed if ok
      return await this.exercisesService.addCourse(id, course)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('cancel/:registeredCourse/')
  async cancel(@Request() req, @Param('registeredCourse', ParseIntPipe) course: number) {
    const userId = req.user.id
    if (userId == this.exercisesService.returnUserIdCourse(course)) {
      return await this.exercisesService.deleteUserFromCourse(course)
    }else{
      throw new UnauthorizedException('Not authorized user to delete course', { cause: new Error() })
    }
  }

}
