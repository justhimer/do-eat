import { Test, TestingModule } from '@nestjs/testing';
import { UserSchedulesController } from './user_schedules.controller';
import { UserSchedulesService } from './user_schedules.service';

describe('UserSchedulesController', () => {
  let controller: UserSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSchedulesController],
      providers: [UserSchedulesService],
    }).compile();

    controller = module.get<UserSchedulesController>(UserSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
