import { OmitType} from '@nestjs/swagger';
import { CourseSchedules } from '../entities/CourseSchedules.entities';


export class UpdateCourseSchedulesDTO extends OmitType(CourseSchedules, ["gyms"] as const) {}
