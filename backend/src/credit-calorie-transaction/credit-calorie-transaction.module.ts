import { Global, Module } from '@nestjs/common';
import { CreditCalorieTransactionService } from './credit-calorie-transaction.service';
import { CreditCalorieTransactionController } from './credit-calorie-transaction.controller';

@Global()
@Module({
  controllers: [CreditCalorieTransactionController],
  providers: [CreditCalorieTransactionService],
  exports: [CreditCalorieTransactionService]
})
export class CreditCalorieTransactionModule {}
