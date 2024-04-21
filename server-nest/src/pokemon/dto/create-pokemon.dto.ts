import { IsNotEmpty, IsString, Min } from 'class-validator';

export {} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @Min(3)
  name: string;
}
