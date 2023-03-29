import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CalorieTransactionService } from './calorie-transaction.service';

@Controller('calorie')
export class CalorieTransactionController {
  constructor(private readonly calorieTransactionService: CalorieTransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async calories(@Request() req){
    const userID = req.user.id;
    return await this.calorieTransactionService.getUserCalories(userID);
  }
}
