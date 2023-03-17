import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class Food {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    food_type_id: number;

    @ApiProperty({ default: 'default-food.jpg' })
    @IsString()
    image: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    ingredient: string[];

    @ApiProperty()
    allergens: string[];

    @ApiProperty()
    @IsString()
    preparation: string;
}
