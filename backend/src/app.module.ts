import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule.forRoot()],  // forRoot() : global use
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
