import { Test, TestingModule } from '@nestjs/testing';
import { FoodCartService } from './foodCart.service';

describe('CartService', () => {
    let service: FoodCartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FoodCartService],
        }).compile();

        service = module.get<FoodCartService>(FoodCartService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

