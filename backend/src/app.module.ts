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
import { StripeModule } from './stripe/stripe.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { FoodCartModule } from './cart/foodCart.module';

import { CourseTypeModule } from './course_type/course_type.module';
import { FoodHistoryModule } from './food_history/food_history.module';
import { FoodOrderModule } from './food_order/food_order.module';
import { IntensityModule } from './intensity/intensity.module';
import { GymFoodStockModule } from './gym-food-stock/gym-food-stock.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "public"),
      serveRoot: join(__dirname, "public", "images", "trainers", "default_trainer.png")
    }),
    PrismaModule.forRoot(),
    StripeModule.forRoot(process.env.STRIPE_API_SECRET_KEY, { apiVersion: '2022-11-15' }),
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
    StripeModule,
    PaymentModule,
    SubscriptionsModule,
    FoodCartModule,
    CourseTypeModule,
    FoodHistoryModule,
    FoodOrderModule,
    IntensityModule,
    GymFoodStockModule,
  ], // forRoot() : global use
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
