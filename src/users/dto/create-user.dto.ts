import { IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    readonly id: string

    readonly name: string

    readonly email: string

    readonly password: string
}