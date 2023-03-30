import { Test, TestingModule } from '@nestjs/testing';
import { UserSchedulesService } from './user_schedules.service';

describe('UserSchedulesService', () => {
  let service: UserSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSchedulesService],
    }).compile();

    service = module.get<UserSchedulesService>(UserSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
