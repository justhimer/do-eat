import { Injectable } from '@nestjs/common';
import { CreateIntensityDto } from './dto/create-intensity.dto';
import { UpdateIntensityDto } from './dto/update-intensity.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class IntensityService {
  constructor(private readonly prisma:PrismaService){}

  async findAll() {
    return await this.prisma.intensities.findMany({
      select:{
        id:true,
        level:true
      }
    })
  }

}
