import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger, Query, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CreditCalorieTransactionService } from 'src/credit-calorie-transaction/credit-calorie-transaction.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService, private readonly creditService: CreditCalorieTransactionService) {}


  @Get("/")
  findAll() {
    console.log('wtf')
    return "wtf"
  }

  @Post('join/:course')
  async join(@Param('course',ParseIntPipe) course:number ,@Body('id', ParseIntPipe) id: number){
    await this.creditService.updateUserCredits(id)
    
    //need api to get subscription model
    if (null){

    }else{
      let userCredit = await this.creditService.getUserCredit(id)
      let courseCredit = await this.exercisesService.getExerciseCredit(course)
      if (courseCredit>userCredit){
        throw new BadRequestException('Not Enough Credits', { cause: new Error(), description: 'Not Enough Credits' })
        return
      }
      await this.exercisesService.addCourse(id,course)
  }
    }
    
}
