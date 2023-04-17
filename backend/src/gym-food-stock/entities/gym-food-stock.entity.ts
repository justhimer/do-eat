import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class GymFoodStock {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    gyms_id: number;

    @ApiProperty()
    @IsInt()
    foods_id: number;

    @ApiProperty()
    @IsInt()
    quantiy: number
}
