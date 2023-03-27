import { Test, TestingModule } from '@nestjs/testing';
import { CreditCalorieTransactionController } from './credit-calorie-transaction.controller';
import { CreditCalorieTransactionService } from './credit-calorie-transaction.service';

describe('CreditCalorieTransactionController', () => {
  let controller: CreditCalorieTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCalorieTransactionController],
      providers: [CreditCalorieTransactionService],
    }).compile();

    controller = module.get<CreditCalorieTransactionController>(CreditCalorieTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
