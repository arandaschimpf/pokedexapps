import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Post()
  create(@Body(ValidationPipe) newPokemon: CreatePokemonDto) {
    return this.pokemonService.createPokemon(newPokemon.id, newPokemon.name);
  }

  @Get()
  getAllPokemon() {
    return this.pokemonService.getAllPokemon(5);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.deletePokemon(id);
  }
}
