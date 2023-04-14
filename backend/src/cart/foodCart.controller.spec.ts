import { Test, TestingModule } from '@nestjs/testing';
import { FoodCartController } from './foodCart.controller';
import { FoodCartService } from './foodCart.service';

describe('CartController', () => {
    let controller: FoodCartController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodCartController],
            providers: [FoodCartService],
        }).compile();

        controller = module.get<FoodCartController>(FoodCartController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});