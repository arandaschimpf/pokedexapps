import { Injectable } from '@nestjs/common';

import Datastore from 'nedb-promises';

@Injectable()
export class PokemonService {
  private db;

  constructor() {
    this.db = Datastore.create({ filename: './data/db.db', autoload: true });
  }

  async createPokemon(id: string, name: string) {
    const pokemon = {
      id,
      name,
    };
    const existingPokemonById = await this.db.findOne({ id: id });
    const existingPokemonByName = await this.db.findOne({ name: name });
    if (existingPokemonById) {
      throw new Error('Ya existe un Pokémon con este ID.');
    }
    if (existingPokemonByName) {
      throw new Error('Ya existe un Pokémon con este nombre.');
    }
    this.db.insert(pokemon);
    return pokemon;
  }

  async getAllPokemon(page: number) {
    const allPokemon = await this.db.find({});
    const pokemonSlice = allPokemon.slice(5 * (page - 1), 5 * page);
    return pokemonSlice;
  }

  async pokemonPage() {
    return Math.ceil((await this.db.find({})).length / 5);
  }

  deletePokemon(id: string) {
    return this.db.remove({ id: id }, {});
  }
}
