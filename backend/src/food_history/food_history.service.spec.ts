import { Test, TestingModule } from '@nestjs/testing';
import { FoodHistoryService } from './food_history.service';

describe('FoodHistoryService', () => {
  let service: FoodHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodHistoryService],
    }).compile();

    service = module.get<FoodHistoryService>(FoodHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
