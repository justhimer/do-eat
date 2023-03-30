import { Global, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'nestjs-prisma';

@Global()
@Module({
  controllers: [CoursesController],
  providers: [CoursesService,PrismaService]
})
export class CoursesModule {}
