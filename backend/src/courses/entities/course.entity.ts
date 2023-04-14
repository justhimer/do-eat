import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class Course {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    intensity_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    course_type_id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    gym_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    credits: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    calories: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    duration: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    default_quota: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    default_trainer_id: number;
}
