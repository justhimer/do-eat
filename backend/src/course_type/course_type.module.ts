import { Module } from '@nestjs/common';
import { CourseTypeService } from './course_type.service';
import { CourseTypeController } from './course_type.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CourseTypeController],
  providers: [CourseTypeService, PrismaService]
})
export class CourseTypeModule {}
