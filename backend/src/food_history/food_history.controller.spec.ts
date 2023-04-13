import { Test, TestingModule } from '@nestjs/testing';
import { FoodHistoryController } from './food_history.controller';
import { FoodHistoryService } from './food_history.service';

describe('FoodHistoryController', () => {
  let controller: FoodHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodHistoryController],
      providers: [FoodHistoryService],
    }).compile();

    controller = module.get<FoodHistoryController>(FoodHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
