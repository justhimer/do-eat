import { Test, TestingModule } from '@nestjs/testing';
import { GymFoodStockService } from './gym-food-stock.service';

describe('GymFoodStockService', () => {
  let service: GymFoodStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymFoodStockService],
    }).compile();

    service = module.get<GymFoodStockService>(GymFoodStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
