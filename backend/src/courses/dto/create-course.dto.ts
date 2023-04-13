import { PartialType } from "@nestjs/swagger";
import { Course } from "../entities/course.entity";

export class CreateCourseDto extends PartialType(Course){}
