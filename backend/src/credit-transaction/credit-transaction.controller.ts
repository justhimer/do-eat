import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreditTransactionService } from './credit-transaction.service';

@ApiTags('credit') // to categorize in swagger
@Controller('credit')
export class CreditTransactionController {
  constructor(private readonly creditTransactionService: CreditTransactionService) {}

  @Get(':id')
  async credit(@Param('id',ParseIntPipe)id :number){
    return await this.creditTransactionService.getUserCredits(id)
  }
}
