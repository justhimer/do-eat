import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { GymFoodStockService } from './gym-food-stock.service';
import { CreateGymFoodStockDto } from './dto/create-gym-food-stock.dto';
import { UpdateGymFoodStockDto } from './dto/update-gym-food-stock.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { isError } from 'lodash';

@ApiTags('gymFoodStock')
@Controller('gymFoodStock')
export class GymFoodStockController {
  constructor(private readonly gymFoodStockService: GymFoodStockService) {}

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/all')
  async findAllForGym(@Req() req) {
    const gym_id = req.user.id
    const data = await this.gymFoodStockService.findAllForGym(gym_id)
    if (!isError(data)){
      return data
    }else{
      console.log("Error: ",data)
      return new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Get('gym/stock/:food_id')
  async findOneForGym(@Req() req, @Param('food_id',ParseIntPipe) food_id:number){
    const gym_id = req.user.id
    const data = await this.gymFoodStockService.findOneForGym(gym_id,food_id)
    if (!isError(data)){
      return data
    }else{
      console.log("Error: ",data)
      return new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('gym/change')
  async changeStockForGym(@Req() req, @Body() body:UpdateGymFoodStockDto) {
    const gym_id = req.user.id
    const data = await this.gymFoodStockService.changeStockForGym(gym_id, body)
    if (!isError(data)){
      return data
    }else{
      console.log("Error: ",data)
      return new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('gym/add')
  async addFoodForGym(@Req() req, @Body() body:CreateGymFoodStockDto) {
    const gym_id = req.user.id
    const data = await this.gymFoodStockService.addFoodForGym(gym_id,body)
    if (!isError(data)){
      return data
    }else{
      console.log("Error: ",data)
      return new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(AuthGuard('jwt_gym'))
  @Post('gym/remove:food_id')
  async removeFoodForGym(@Req() req, @Param('food_id',ParseIntPipe) food_id:number) {
    const gym_id = req.user.id
    const data = await this.gymFoodStockService.removeFoodForGym(gym_id,food_id)
    if (!isError(data)){
      return data
    }else{
      console.log("Error: ",data)
      return new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }
}
