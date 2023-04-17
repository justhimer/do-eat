import { Module } from '@nestjs/common';
import { IntensityService } from './intensity.service';
import { IntensityController } from './intensity.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [IntensityController],
  providers: [IntensityService, PrismaService]
})
export class IntensityModule {}
