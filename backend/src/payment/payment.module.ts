import { Global, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'nestjs-prisma';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Global()
@Module({
  imports: [SubscriptionsModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, SubscriptionsService],
  exports: [PaymentService]
})
export class PaymentModule {}
