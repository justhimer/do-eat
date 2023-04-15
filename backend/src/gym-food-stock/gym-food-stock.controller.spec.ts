import { Test, TestingModule } from '@nestjs/testing';
import { GymFoodStockController } from './gym-food-stock.controller';
import { GymFoodStockService } from './gym-food-stock.service';

describe('GymFoodStockController', () => {
  let controller: GymFoodStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymFoodStockController],
      providers: [GymFoodStockService],
    }).compile();

    controller = module.get<GymFoodStockController>(GymFoodStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
