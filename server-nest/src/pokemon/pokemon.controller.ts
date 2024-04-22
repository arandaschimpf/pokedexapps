import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  getAllPokemon(@Query('page') page: number) {
    const pageNumber = page ? page : 1;
    return this.pokemonService.getAllPokemon(pageNumber);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.deletePokemon(id);
  }
}
