import { Global, Module } from '@nestjs/common';
import { CalorieTransactionService } from './calorie-transaction.service';
import { CalorieTransactionController } from './calorie-transaction.controller';
import { PrismaService } from 'nestjs-prisma';

@Global()
@Module({
  controllers: [CalorieTransactionController],
  providers: [CalorieTransactionService,PrismaService],
  exports: [CalorieTransactionService]
})
export class CalorieTransactionModule {}
