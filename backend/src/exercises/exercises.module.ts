import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { CreditCalorieTransactionService } from 'src/credit-calorie-transaction/credit-calorie-transaction.service';
import { CreditCalorieTransactionModule } from 'src/credit-calorie-transaction/credit-calorie-transaction.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports:[CreditCalorieTransactionModule],
  controllers: [ExercisesController],
  providers: [ExercisesService,CreditCalorieTransactionService,PrismaClient]
})
export class ExercisesModule {}
