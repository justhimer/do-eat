import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { PrismaService } from 'nestjs-prisma';
import { CreditCalorieTransactionService } from 'src/credit-calorie-transaction/credit-calorie-transaction.service';
import { CreditCalorieTransactionModule } from 'src/credit-calorie-transaction/credit-calorie-transaction.module';

@Module({
  imports:[CreditCalorieTransactionModule],
  controllers: [ExercisesController],
  providers: [ExercisesService,PrismaService,CreditCalorieTransactionService]
})
export class ExercisesModule {}
