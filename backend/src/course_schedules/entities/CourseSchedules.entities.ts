import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CourseSchedules {

  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  course_id: number;

  @ApiProperty()
  @IsInt()
  trainer_id: number;

  @ApiProperty()
  @IsInt()
  quota: number;

  @ApiProperty()
  @IsDateString()
  time: string;

  @ApiProperty()
  @IsInt({each:true})
  gyms: Array<number>;
}
