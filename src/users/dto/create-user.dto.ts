import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    readonly id: string

    @ApiProperty({
        description: 'The name of a user.',
    })
    readonly name: string

    @ApiProperty()
    readonly email: string


    @ApiProperty()
    readonly password: string
}