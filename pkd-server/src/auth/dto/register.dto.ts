import {IsString, IsEmail, MinLength} from 'class-validator'
import Transform from 'class-transformer'

export class RegisterDTO {
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    @MinLength(1)
    email: string;
    
    @IsString()
    @MinLength(8)
    password: string;
}