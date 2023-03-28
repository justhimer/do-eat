import { Test, TestingModule } from '@nestjs/testing';
import { CreditCalorieTransactionService } from './credit-calorie-transaction.service';

describe('CreditCalorieTransactionService', () => {
  let service: CreditCalorieTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditCalorieTransactionService],
    }).compile();

    service = module.get<CreditCalorieTransactionService>(CreditCalorieTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
