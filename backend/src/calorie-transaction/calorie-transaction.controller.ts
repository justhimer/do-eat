import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CalorieTransactionService } from './calorie-transaction.service';

@ApiTags('calorie') // to categorize in swagger
@Controller('calorie')
export class CalorieTransactionController {
  constructor(private readonly calorieTransactionService: CalorieTransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async calories(@Param('id',ParseIntPipe)id :number){
    return await this.calorieTransactionService.getUserCalories(id)
  }
}
