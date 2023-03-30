import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
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
}
