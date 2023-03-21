import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { FoodTypesModule } from './food_types/food_types.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    UsersModule,
    FoodsModule,
    FoodTypesModule,
    DistrictsModule],  // forRoot() : global use
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
