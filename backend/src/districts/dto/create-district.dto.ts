import { OmitType } from '@nestjs/swagger';
import { District } from '../entities/district.entity';

export class CreateDistrictDto extends OmitType(District, ['id'] as const) {}
