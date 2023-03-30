import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

interface GooglePosition{
    lat:number,
    long:number
}

export class Gyms {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsInt()
  franchise_id: number;

  @ApiProperty()
  @IsInt()
  district_id: number

  @ApiProperty()
  @IsInt()
  opening_hour: number
  
  @ApiProperty()
  @IsInt()
  closing_hour: number
  
  @ApiProperty()
  @IsBoolean()
  no_close : boolean
  
  @ApiProperty()
  @IsInt()
  address :string

  @ApiProperty()
  google_position : GooglePosition
}
