import { Test, TestingModule } from '@nestjs/testing';
import { CreditTransactionController } from './credit-transaction.controller';
import { CreditTransactionService } from './credit-transaction.service';

describe('CreditTransactionController', () => {
  let controller: CreditTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditTransactionController],
      providers: [CreditTransactionService],
    }).compile();

    controller = module.get<CreditTransactionController>(CreditTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
