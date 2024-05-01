import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginDTO{


    @IsEmail() //es para "decir" esto se tiene que comportar como un email
    email: string;
    
    @Transform(({value}) => value.trim()) //esto sirve para que el usuario no envie caracteres en blanco... es decir, si el usuario envia "  hola  " se le quitarán los espacios en blanco y quedará "hola"
    @IsString() //es para "decir" esto se tiene que comportar como un string
    @MinLength(6) //es para "decir" que la longitud mínima de la contraseña es 6 caracteres
    contra: string;
}