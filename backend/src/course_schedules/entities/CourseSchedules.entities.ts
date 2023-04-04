import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

interface GooglePosition{
    lat:number,
    long:number
}

export class CourseSchedules {
  @ApiProperty()
  @IsDateString()
  time: string;

  @ApiProperty()
  @IsInt({each:true})
  gyms: Array<number>;
}
