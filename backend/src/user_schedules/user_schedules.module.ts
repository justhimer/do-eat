import { Global, Module } from '@nestjs/common';
import { UserSchedulesService } from './user_schedules.service';
import { UserSchedulesController } from './user_schedules.controller';
import { PrismaService } from 'nestjs-prisma';
import { CreditTransactionModule } from 'src/credit-transaction/credit-transaction.module';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { CourseSchedulesModule } from 'src/course_schedules/course_schedules.module';
import { CourseSchedulesService } from 'src/course_schedules/course_schedules.service';
import { CalorieTransactionService } from 'src/calorie-transaction/calorie-transaction.service';

@Global()
@Module({
  imports:[CreditTransactionModule,UsersModule,CoursesModule,CourseSchedulesModule],
  controllers: [UserSchedulesController],
  providers: [UserSchedulesService,PrismaService,CreditTransactionService,UsersService,CoursesService,CourseSchedulesService, CalorieTransactionService],
  exports: [UserSchedulesService]
})
export class UserSchedulesModule {}
