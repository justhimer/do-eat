import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';

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

}
