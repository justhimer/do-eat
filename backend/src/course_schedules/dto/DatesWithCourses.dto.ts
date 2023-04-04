import { PartialType, PickType} from '@nestjs/swagger';
import { CourseSchedules } from '../entities/CourseSchedules.entities';


export class DatesWithCoursesDto extends PickType(CourseSchedules, ["gyms"] as const) {}
