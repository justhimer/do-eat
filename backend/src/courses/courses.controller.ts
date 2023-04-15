import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { Courses } from '@prisma/client';
import { Course } from './entities/course.entity';
import { isError } from 'lodash';

@ApiTags('courses') // to categorize in swagger
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get("all")
  async findAll() {
    
    return await this.coursesService.allCourses()
  }

  @Get("some")
  async getDistrictLocations(@Body() districts: number[]) {
    return await this.coursesService.districtCourses(districts)
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gyms/all')
  async getCoursesInGym(@Req() req){
    const gym_id = req.user.id
    return await this.coursesService.allCoursesInGym(gym_id)
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('gyms/course')
  async createCourse(@Req() req, @Body() body : CreateCourseDto){
    const gym_id = req.user.id
    return await this.coursesService.createCourse(body ,gym_id)  
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Put('gyms/course')
  async updateCourse(@Req() req, @Body() body:Course){
    const data = await this.coursesService.updateCourseInfo(body)
    if (!isError(data)){
      return data
    }else{
      return new HttpException('Update Error', HttpStatus.BAD_REQUEST)
    }
  }

}
