import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get("all")
  async findAll() {
    
    return await this.coursesService.allCourses()
  }

  @Get("some")
  async getDistrictLocations(@Body() districts: number[]) {
    return this.coursesService.districtCourses(districts)
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
}
