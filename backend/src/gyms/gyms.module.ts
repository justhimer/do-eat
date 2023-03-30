import { Global, Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { PrismaService } from 'nestjs-prisma';
import { DistrictsModule } from 'src/districts/districts.module';
import { DistrictsService } from 'src/districts/districts.service';

@Global()
@Module({
  imports:[DistrictsModule],
  controllers: [GymsController],
  providers: [GymsService,PrismaService,DistrictsService],
  exports: [GymsService]
})
export class GymsModule {}
