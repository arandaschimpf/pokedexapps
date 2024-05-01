import { Controller, Get, Post, Body, Query, Delete, Param, UseGuards } from '@nestjs/common';
import { PokemonService } from './app.service';
import { Pokemon } from './pokemon.interface';
import { AuthGuard } from './auth/auth.guard';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

// @UseGuards(AuthGuard)
  @Get()
  async getPokemonList(@Query('page') page?: number): Promise<{ list: Pokemon[], count: number }> {
    return this.pokemonService.getPokemonList(page);
  }

  @Post()
 //@UseGuards(AuthGuard)
  async addPokemon(@Body() pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonService.addPokemon(pokemon);
  }
//@UseGuards(AuthGuard)
  @Delete(':id')
  async deletePokemon(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.deletePokemon(parseInt(id));
  }

}
