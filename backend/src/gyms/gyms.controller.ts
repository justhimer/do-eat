import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GymDistrictDto } from './dto/gym-district.dto';
import { GymsService } from './gyms.service';

@ApiTags('gyms') // to categorize in swagger
@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get('all')
  async all(){
    return await this.gymsService.allGyms()
  }

  @Get('some')
  async some(){

  }

  @Post('district')
  async district(@Body() list: number[]){
    return await this.gymsService.districtGyms(list)
  }
}

