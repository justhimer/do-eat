import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { CreditTransactionModule } from 'src/credit-transaction/credit-transaction.module';
import { CreditTransactionService } from 'src/credit-transaction/credit-transaction.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports:[CreditTransactionModule],
  controllers: [ExercisesController],
  providers: [ExercisesService,CreditTransactionService,PrismaService]
})
export class ExercisesModule {}
