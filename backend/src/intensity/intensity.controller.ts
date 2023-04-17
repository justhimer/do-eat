import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntensityService } from './intensity.service';
import { CreateIntensityDto } from './dto/create-intensity.dto';
import { UpdateIntensityDto } from './dto/update-intensity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('intensity')
@Controller('intensity')
export class IntensityController {
  constructor(private readonly intensityService: IntensityService) {}
  
  @Get()
  findAll() {
    return this.intensityService.findAll();
  }

}
