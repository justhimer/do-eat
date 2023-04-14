import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class FoodCart {
    @ApiProperty()
    @IsInt()
    id: number;

    // @ApiProperty()
    // @IsInt()
    // user_id: string;

    @ApiProperty()
    @IsInt()
    food_id: number;


    @ApiProperty()
    @IsInt()
    quantity: number;


}
