import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export {} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @MinLength(3)
  name: string;
}
