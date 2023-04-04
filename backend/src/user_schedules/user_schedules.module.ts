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

@Global()
@Module({
  imports:[CreditTransactionModule,UsersModule,CoursesModule],
  controllers: [UserSchedulesController],
  providers: [UserSchedulesService,PrismaService,CreditTransactionService,UsersService,CoursesService],
  exports: [UserSchedulesService]
})
export class UserSchedulesModule {}
