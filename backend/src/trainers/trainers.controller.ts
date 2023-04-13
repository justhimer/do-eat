import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get('all/:franchise')
  async getFranchiseTrainers (@Param('franchise',ParseIntPipe) franchise_id:number){
    return await this.trainersService.getAllFromFranchise(franchise_id)
  }
}
