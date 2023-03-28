import { Global, Module } from '@nestjs/common';
import { CreditTransactionService } from './credit-transaction.service';
import { CreditTransactionController } from './credit-transaction.controller';
import { PrismaService } from 'nestjs-prisma';

@Global()
@Module({
  controllers: [CreditTransactionController],
  providers: [CreditTransactionService,PrismaService],
  exports: [CreditTransactionService]
})
export class CreditTransactionModule {}
