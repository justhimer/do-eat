import { Test, TestingModule } from '@nestjs/testing';
import { CalorieTransactionController } from './calorie-transaction.controller';
import { CalorieTransactionService } from './calorie-transaction.service';

describe('CalorieTransactionController', () => {
  let controller: CalorieTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalorieTransactionController],
      providers: [CalorieTransactionService],
    }).compile();

    controller = module.get<CalorieTransactionController>(CalorieTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
