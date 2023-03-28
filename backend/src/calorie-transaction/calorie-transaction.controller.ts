import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CalorieTransactionService } from './calorie-transaction.service';

@Controller('calorie')
export class CalorieTransactionController {
  constructor(private readonly calorieTransactionService: CalorieTransactionService) {}

  @Get(':id')
  async calories(@Param('id',ParseIntPipe)id :number){
    return await this.calorieTransactionService.getUserCalories(id)
  }
}
