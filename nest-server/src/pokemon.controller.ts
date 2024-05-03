// pokemon.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.interface';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemonList(@Query('page') page?: number) {
    return this.pokemonService.getPokemonList(page);
  }

  @Post()
  addPokemon(@Body() pokemon: Pokemon) {
    return this.pokemonService.addPokemon(pokemon);
  }

  @Delete(':id')
  deletePokemon(@Param('id') id: number) {
    return this.pokemonService.deletePokemon(id);
  }
}
