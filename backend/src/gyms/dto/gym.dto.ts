import { PartialType} from '@nestjs/swagger';
import { Gyms } from '../entities/gyms.entity';

export class GymDto extends PartialType(Gyms) {}
