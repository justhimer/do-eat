import { Test, TestingModule } from '@nestjs/testing';
import { CourseSchedulesController } from './course_schedules.controller';
import { CourseSchedulesService } from './course_schedules.service';

describe('CourseSchedulesController', () => {
  let controller: CourseSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseSchedulesController],
      providers: [CourseSchedulesService],
    }).compile();

    controller = module.get<CourseSchedulesController>(CourseSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
