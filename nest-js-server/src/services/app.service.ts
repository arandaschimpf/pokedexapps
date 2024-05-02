import { Injectable } from '@nestjs/common';
import {PokemonListResponse,Pokemon } from '../interfaces/pokemon.interface';

@Injectable()
export class AppService {

  pokemons : Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
    { id: 10, name: 'Messi' },
    { id: 11, name: 'Metapod' },
    { id: 12, name: 'Butterfree' },
    { id: 13, name: 'Weedle' },
    { id: 14, name: 'Kakuna' },
  ]

  getPokemonById(Pokemonid:number): Pokemon {
    return this.pokemons.find(pokemon => pokemon.id === Pokemonid)
  }

  removePokemon(pokemonid:number):Pokemon{
    const index = this.pokemons.findIndex(pokemon => pokemon.id === pokemonid);
    console.log(pokemonid, index, typeof pokemonid)
    if (index === -1){
      throw new Error('Pokemon not found.');
    }
    return this.pokemons.splice(index,1)[0]
  }

  fetchAllPokemon(page? : number,pageSize = 5): PokemonListResponse{
    const startIndex = (page -1 ) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedList = this.pokemons.slice(startIndex,endIndex)
    return {list : paginatedList, totalCount : this.pokemons.length};
 }
 CreatePokemon(newPokemon: Pokemon) : Pokemon {
  if (this.pokemons.some(pokemon => pokemon.id == newPokemon.id)){
    throw new Error ('Pokemon with this ID already exists');
  }
  this.pokemons.push(newPokemon);
  return newPokemon
 }
}