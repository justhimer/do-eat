import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseTypeService } from './course_type.service';
import { CreateCourseTypeDto } from './dto/create-course_type.dto';
import { UpdateCourseTypeDto } from './dto/update-course_type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('course-type')
@Controller('course-type')
export class CourseTypeController {
  constructor(private readonly courseTypeService: CourseTypeService) {}

  @Get()
  findAll() {
    return this.courseTypeService.allCourseType();
  }
}
