import { Injectable } from '@nestjs/common';
import { CreateCourseTypeDto } from './dto/create-course_type.dto';
import { UpdateCourseTypeDto } from './dto/update-course_type.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CourseTypeService {
  constructor(private readonly prisma: PrismaService){}

  async allCourseType(){
    try {
      const data = await this.prisma.courseTypes.findMany({
        select:{
          id:true,
          name:true
        }
      })
      if (data){
        return data
      }else{
        console.log('Error: No Data at Course_type.service')
        throw new Error('No Data')
      }
    } catch (error) {
      console.log('Error at Course_type.service: ', error)
      throw new Error(error)
    }
  }
}
