import { Injectable } from '@nestjs/common';
import {PokemonListResponse,Pokemon } from './pokemon.interface';

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
    { id: 10, name: 'Pikachu' },
    { id: 10, name: 'Messi' },
    

  ]

  getPokemonById(Pokemonid:number): Pokemon {
    return this.pokemons.find(pokemon => pokemon.id === Pokemonid)

  }

  removePokemon(Pokemonid:number):Pokemon{
    const index = this.pokemons.findIndex(pokemon => pokemon.id === Pokemonid);
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