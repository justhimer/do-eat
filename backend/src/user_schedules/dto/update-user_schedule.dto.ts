import { PartialType } from '@nestjs/swagger';
import { CreateUserScheduleDto } from './create-user_schedule.dto';

export class UpdateUserScheduleDto extends PartialType(CreateUserScheduleDto) {}
