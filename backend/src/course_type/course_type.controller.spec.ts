import { Test, TestingModule } from '@nestjs/testing';
import { CourseTypeController } from './course_type.controller';
import { CourseTypeService } from './course_type.service';

describe('CourseTypeController', () => {
  let controller: CourseTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseTypeController],
      providers: [CourseTypeService],
    }).compile();

    controller = module.get<CourseTypeController>(CourseTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
