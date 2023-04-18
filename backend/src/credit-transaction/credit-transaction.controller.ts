import { Controller, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreditTransactionService } from './credit-transaction.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('credit') // to categorize in swagger
@Controller('credit')
export class CreditTransactionController {
  constructor(private readonly creditTransactionService: CreditTransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async credit(@Request() req){
    return await this.creditTransactionService.getUserCredits(req.user.id)
  }
}
