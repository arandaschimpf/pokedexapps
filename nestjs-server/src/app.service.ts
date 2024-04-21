import { Injectable } from '@nestjs/common';
import {PokemonListResponse,Pokemon } from './pokemon.interface';

@Injectable()
export class AppService {

  pokemonList : Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
  ]

  getPokemonById(id:number): Pokemon {
    return this.pokemonList.find(pokemon => pokemon.id === id)

  }

  deletePokemon(id:number):Pokemon{
    console.log(this.pokemonList);
    console.log(`Deleting Pokémon with ID: ${id}`);
    
    console.log(this.getPokemonById(id))

    const index = this.pokemonList.findIndex(pokemon => pokemon.id === id);
    console.log(`Index found: ${index}`);

    if (index === -1){
      throw new Error('Pokemon not found.');
    }
    return this.pokemonList.splice(index,1)[0]

  }

  getAllPokemon(page? : number,pageSize = 5): PokemonListResponse{
    const startIndex = (page -1 ) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedList = this.pokemonList.slice(startIndex,endIndex)
   return {list : paginatedList, totalCount : this.pokemonList.length};

 }

 addPokemon(newPokemon: Pokemon) : Pokemon {
  if (this.pokemonList.some(pokemon => pokemon.id == newPokemon.id)){
    throw new Error ('Pokemon with this ID already exists');
  }
  this.pokemonList.push(newPokemon);
  return newPokemon
 }


}