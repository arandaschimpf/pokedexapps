import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class PokeDatos {

    @IsNumber()
    idPoke: number;
    @Transform(({ value }) => value.trim()) //esto sirve para que el usuario no envie caracteres en blanco... es decir, si el usuario envia "  hola  " se le quitarán los espacios en blanco y quedará "hola"
    @IsString() //es para "decir" esto se tiene que comportar como un string
    @MinLength(1) //es para "decir" que la longitud mínima del usuario es 3 caracteres
    pokemonName: string;

}