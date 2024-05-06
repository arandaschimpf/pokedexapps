import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/app.entity';
import type { User } from "./users/users-db";
import * as usersDB from "./users/users-db";
import { getSalt, hashPassword } from "./users/helpers/hashPassword"; 

@Injectable()
export class UsersService {
  async createUser(user: { email: string, password: string }) {
    if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
      throw new Error('Invalid email');
    }
    const existing = await usersDB.findByEmail(user.email);
    if (existing) {
      throw new Error('User already exists');
    }
    if (!user.password || user.password.length < 8) {
      throw new Error('Password too short');
    }
  
    const salt = getSalt();
    const userWithHash: User = {
      email: user.email,
      hash: hashPassword(salt + user.password),
      salt
    };
  
    return usersDB.createUser(userWithHash);
  }
  
  async authenticateUser(user: { email: string, password: string }) {
    const existing = await usersDB.findByEmail(user.email);
    if (!existing) {
      throw new Error('User not found');
    }
    const hash = hashPassword(existing.salt + user.password);
    if (hash !== existing.hash) {
      throw new Error('Invalid password');
    }
    return { email: existing.email };
  }
}

@Injectable()
export class PokemonService {
  pokemonList: Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
  ];

  async findPokemonById(id: number) {
    return this.pokemonList.find(p => p.id === id);
  }

  async findPokemonByName(name: string) {
    return this.pokemonList.find(p => p.name === name);
  }

  async getPokemonList(page?: number): Promise<{ list: Pokemon[], count: number }> {
    if (!page) {
      return { list: this.pokemonList, count: this.pokemonList.length };
    }
    return { list: this.pokemonList.slice((page - 1) * 5, page * 5), count: this.pokemonList.length };
  }

  async addPokemon(pokemon: Pokemon) {
    if (this.pokemonList.some((p) => p.id === pokemon.id)) {
      throw new Error('Pokemon already exists');
    }
    this.pokemonList.push(pokemon);
    return pokemon;
  }

  async deletePokemon(pokemonId: number) {
    const index = this.pokemonList.findIndex((pokemon) => pokemon.id === pokemonId);
    if (index === -1) {
      throw new Error('Pokemon not found');
    }
    return this.pokemonList.splice(index, 1)[0];
  }
}