import { Global, Module } from '@nestjs/common';
import { CreditCalorieTransactionService } from './credit-calorie-transaction.service';
import { CreditCalorieTransactionController } from './credit-calorie-transaction.controller';
import { PrismaService } from 'nestjs-prisma';

@Global()
@Module({
  controllers: [CreditCalorieTransactionController],
  providers: [CreditCalorieTransactionService,PrismaService],
  exports: [CreditCalorieTransactionService]
})
export class CreditCalorieTransactionModule {}
