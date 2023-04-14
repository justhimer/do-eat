import { OmitType, PartialType } from "@nestjs/swagger";
import { Course } from "../entities/course.entity";

export class CreateCourseDto extends OmitType(Course, ['id'] as const){}
