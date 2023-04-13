import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

// @Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
