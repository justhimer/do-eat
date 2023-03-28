import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreditTransactionService } from './credit-transaction.service';

@Controller('credit')
export class CreditTransactionController {
  constructor(private readonly creditTransactionService: CreditTransactionService) {}

  @Get(':id')
  async credit(@Param('id',ParseIntPipe)id :number){
    return await this.creditTransactionService.getUserCredits(id)
  }
}
