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
console.log("quota", quota)
let filledSlots = (await this.prisma.userSchedule.aggregate({
  _count:{course_schedule_id:true},
  where:{course_schedule_id:exercise_id}
}))._count.course_schedule_id
console.log("filledSlots",filledSlots)
console.log("remaining slots:", quota - filledSlots)
return (quota - filledSlots)
}

async findUserinCourse(user_id: number, exercise_id:number) :Promise<boolean>{
  let foundUser = await this.prisma.userSchedule.findFirst({
    where:{
      user_id:user_id,
      course_schedule_id:exercise_id
    }
  })

  console.log("foundUser.id", foundUser)
  console.log("foundUser.id test", foundUser? true: false)
  return foundUser? true: false
}

//#region add course and premium add course 


async addCourse(user_id:number, exercise_id:number){
  try {
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
    return "course subscribed"
  } catch (error) {
    console.log(error);
    return error    
  }
}

async addCoursePremium(user_id:number, exercise_id:number){
  try {
    const addToCourse = this.prisma.userSchedule.create({
      data:{
        user_id:user_id,
        course_schedule_id: exercise_id,
        attendance_type_id:1,
        creditTransaction:{
          create:{
            user_id:user_id,
            credit: 0,
            details: `joined course as Premium User`,
            credit_transaction_type_id:2
          }
        }
      },
    })
  
    await this.prisma.$transaction([addToCourse])
    return "course subscribed"
  } catch (error) {
    console.log(error);
    return error    
  }
  
}
//#endregion

async returnUserIdCourse(registered_id:number){
  return (await this.prisma.userSchedule.findFirst({
    where:{id:registered_id}
  })).user_id
}

async deleteUserFromCourse(registered_id:number){
  try {
    const deleteFromCreditTransaction = this.prisma.creditTransaction.deleteMany({
      where:{
        user_schedule_id: registered_id
      }
    })
    
    const deleteFromUserSchedule = this.prisma.userSchedule.delete({
      where:{
        id: registered_id
      }
    })

    await this.prisma.$transaction([deleteFromCreditTransaction,deleteFromUserSchedule])
    return "Deleted course registration"
  } catch (error) {
    console.log(error)
    return error
  }
}
}
