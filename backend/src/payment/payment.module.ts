import { Global, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'nestjs-prisma';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Global()
@Module({
  imports: [SubscriptionsModule,UsersModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, SubscriptionsService, UsersService],
  exports: [PaymentService]
})
export class PaymentModule {}
