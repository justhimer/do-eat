import { Global, Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { PrismaService } from 'nestjs-prisma';
import { DistrictsModule } from 'src/districts/districts.module';
import { DistrictsService } from 'src/districts/districts.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGymStrategy } from './strategy/jwtgym.strategy';

@Global()
@Module({
  imports: [
    DistrictsModule,
    JwtModule.register({
      secret: process.env.JWT_GYM_SECRET,
      signOptions: { expiresIn: '12h' },
    })
  ],
  controllers: [GymsController],
  providers: [GymsService, PrismaService, DistrictsService, JwtGymStrategy],
  exports: [GymsService]
})
export class GymsModule { }
