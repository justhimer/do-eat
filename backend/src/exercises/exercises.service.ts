import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService){}

async allLocations(){
  let data = await this.prisma.gyms.findMany({
    include:{district:{
      select:{
        name:true
      }
    }}
  })
  console.log(data)
}

//#region add course and premium add course 
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

async getRemainingSlots(exercise_id:number){
  let quota = (await this.prisma.courseSchedules.findFirstOrThrow({
    select:{quota:true},
    where:{id:exercise_id}
  })).quota
  let filledSlots = (await this.prisma.userSchedule.aggregate({
    _count:{course_schedule_id:true},
    where:{id:exercise_id}
  }))._count.course_schedule_id
  return quota - filledSlots
}

async addCourse(user_id:number, exercise_id:number){
  const addToCourse = this.prisma.userSchedule.create({
    data:{
      user_id:user_id,
      course_schedule_id: exercise_id,
      attendance_type_id:1,
      creditTransaction:{
        create:{
          user_id:user_id,
          credit: await this.getExerciseCredit(exercise_id),
          details: `joined course`,
          credit_transaction_type_id:2
        }
      }
    },
  })
  
  await this.prisma.$transaction([addToCourse])
}

async addCoursePremium(user_id:number, exercise_id:number){
  const addToCourse = this.prisma.userSchedule.create({
    data:{
      user_id:user_id,
      course_schedule_id: exercise_id,
      attendance_type_id:1,
      creditTransaction:{
        create:{
          user_id:user_id,
          credit: await this.getExerciseCredit(exercise_id),
          details: `joined course as Premium User`,
          credit_transaction_type_id:2
        }
      }
    },
  })

  await this.prisma.$transaction([addToCourse])
}
//#endregion



}
