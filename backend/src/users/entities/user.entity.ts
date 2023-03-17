import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class User {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password?: string;

    @ApiProperty({ default: 'default-icon.jpg' })
    @IsString()
    icon?: string;
}
