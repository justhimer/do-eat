import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class User {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password?: string;

    @ApiProperty({default: 'default-icon.jpg'})
    icon?: string;
}
