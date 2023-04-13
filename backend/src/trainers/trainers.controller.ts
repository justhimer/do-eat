import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { AuthGuard } from '@nestjs/passport';
import { GymsService } from 'src/gyms/gyms.service';
import { CreateTrainersDTO } from './dto/create-trainers.dto';
import { Trainers } from './entities/trainers.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trainers')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService,
    private readonly gymsService: GymsService) {}


  @UseGuards(AuthGuard('jwt_gym'))
  @Get('all')
  async getFranchiseTrainers (@Req() req){
    const gym_id = req.user.id
    const franchise = await this.gymsService.getFranchiseFromGymsID(gym_id)
    return await this.trainersService.getAllFromFranchise(franchise)
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('create')
  async createTrainer(@Req() req, @Body() body: CreateTrainersDTO){
    const gym = req.user.id
    const franchise = await this.gymsService.getFranchiseFromGymsID(gym)
    const data = await this.trainersService.createTrainer(body,gym)
    return data
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Put('update')
  async updateTrainer(@Req() req, @Body() body: Trainers){
    const gym = req.user.id
    const franchise = await this.gymsService.getFranchiseFromGymsID(gym)
    const data = await this.trainersService.updateTrainer(body,gym)
    return data
  }
}
