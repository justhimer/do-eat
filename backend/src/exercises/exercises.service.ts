import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService){}

async allCourses(){
  return await this.prisma.courses.findMany({
    include:{
      intensity:{select:{level:true}},
      course_type:{select:{name:true}},
      gyms:{select:{
        name:true,
        district:{select:{id:true,name:true}},
        franchise:{select:{id:true,name:true}}
      }}
    },
    where:{
      courseSchedules:{
        some:{
          time:{
            gt: new Date
          }
        }
      }
    }
  })
}

async districtCourses(districts:Array<number>){
  return await this.prisma.courses.findMany({
    include:{
      intensity:{select:{level:true}},
      course_type:{select:{name:true}},
      gyms:{select:{
        name:true,
        district:{select:{id:true,name:true}},
        franchise:{select:{id:true,name:true}}
      }}
    },
    where:{
      AND : [
        {courseSchedules:{
          some:{
            time:{
              gt: new Date
            }
          }
        }},
        {
          gyms:{
            district_id: {in:districts}
          }
        }
      ]      
    }
  })
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




}
