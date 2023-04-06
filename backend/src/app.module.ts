import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { FoodTypesModule } from './food_types/food_types.module';
import { DistrictsModule } from './districts/districts.module';
import { CalorieTransactionModule } from './calorie-transaction/calorie-transaction.module';
import { CreditTransactionModule } from './credit-transaction/credit-transaction.module';
import { GymsModule } from './gyms/gyms.module';
import { FranchiseModule } from './franchise/franchise.module';
import { TrainersModule } from './trainers/trainers.module';
import { CourseSchedulesModule } from './course_schedules/course_schedules.module';
import { CoursesModule } from './courses/courses.module';
import { UserSchedulesModule } from './user_schedules/user_schedules.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"public")
    }),
    PrismaModule.forRoot(),
    UsersModule,
    FoodsModule,
    FoodTypesModule,
    DistrictsModule,
    CreditTransactionModule,
    CalorieTransactionModule,
    GymsModule,
    FranchiseModule,
    TrainersModule,
    CourseSchedulesModule,
    CoursesModule,
    UserSchedulesModule,
    FileModule,
  ], // forRoot() : global use
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
