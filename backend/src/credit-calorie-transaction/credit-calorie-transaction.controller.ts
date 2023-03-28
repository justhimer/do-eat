import { Controller } from '@nestjs/common';
import { CreditCalorieTransactionService } from './credit-calorie-transaction.service';

@Controller('credit-calorie-transaction')
export class CreditCalorieTransactionController {
  constructor(private readonly creditCalorieTransactionService: CreditCalorieTransactionService) {}
}
