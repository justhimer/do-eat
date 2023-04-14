import { PartialType, PickType} from '@nestjs/swagger';
import { CourseSchedules } from '../entities/CourseSchedules.entities';


export class CourseSchedulesGymDto extends PickType(CourseSchedules, ["gyms","time"] as const) {}
