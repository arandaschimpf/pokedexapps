import { BadRequestException, Injectable } from '@nestjs/common';
import { PokeDatos } from './dto/pok.dto';
import { PokemonBD } from 'src/db/pokemon';

@Injectable()
export class AppService {

  BDUPokemonService = new PokemonBD(); //traemos los servicios de BD

  async listPokemon(page: number) {
    const pageSize = 4; //cantidad de pokemones que se mostrarán en la página
    let allPokemons = await this.BDUPokemonService.findAll();
    allPokemons = allPokemons.sort((a, b) => a.idPoke - b.idPoke);
    const totalPages = Math.ceil((await (this.BDUPokemonService.findAll())).length / pageSize);
    // Si la página solicitada es mayor que el total de páginas, establece la página en el total de páginas
    if (page > totalPages) {
      page = totalPages;
    }
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pokemons = allPokemons.slice(start, end);

    return {
      pokemons,
      totalPages
    };
  }

  async createPokemon({ idPoke, pokemonName }: PokeDatos) {
    const existingpokemonId = await this.BDUPokemonService.findByPokemonId(idPoke);
    const existingpokemonNom = await this.BDUPokemonService.findByPokemonName(pokemonName);
    console.log(existingpokemonId)
    if (existingpokemonId || existingpokemonNom) {
      throw new BadRequestException('El pokemon ya existe'); //usamos el manejo de errores de nestjs
    }
    return await this.BDUPokemonService.createPokemon({ idPoke, pokemonName });

  }
  async deletePokemon(idPoke: number) {
    return await this.BDUPokemonService.deletePokemon(idPoke);

  }

}
