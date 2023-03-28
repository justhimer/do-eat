import { Test, TestingModule } from '@nestjs/testing';
import { CalorieTransactionService } from './calorie-transaction.service';

describe('CalorieTransactionService', () => {
  let service: CalorieTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalorieTransactionService],
    }).compile();

    service = module.get<CalorieTransactionService>(CalorieTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
