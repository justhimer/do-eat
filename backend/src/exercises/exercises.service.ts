import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaClient){}


  async getExerciseCredit(exercise_id:number){
    let credits = (await this.prisma.courseSchedules.findFirstOrThrow({
     where:{
      id:exercise_id
     },
     include:{
      courses:{
        select:{
          credits:true
        }
      }
     }
  })).courses.credits

  return credits
}

async addCourse(user_id:number, exercise_id:number){
  // const addToCourse = this.prisma.userSchedule.create({
  //   data:{

  //   }
  // })

  // const removeCredits = this.prisma.creditTransaction.update({
  //   where:{
  //     id:user_id
  //   },
  //   data:{

  //   }
  // })

  await this.prisma.$transaction([])
}

}
