import { PickType } from '@nestjs/swagger';
import { GymDto } from './gym.dto';

export class GymDistrictDto extends PickType(GymDto, ['district_id'] as const) {}
