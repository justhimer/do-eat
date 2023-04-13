import { OmitType} from '@nestjs/swagger';
import { UpdateCourseSchedulesDTO } from './UpdateCourseSchedules.dto';


export class CreateCourseSchedulesDTO extends OmitType(UpdateCourseSchedulesDTO, ["id"] as const) {}
