import type { APIRoute, APIContext } from "astro"
import { addPokemon, getPokemonList, type Pokemon } from "../../../services/pokemon"

export const GET: APIRoute = async (context) => {
  const pokemonList = await getPokemonList()
  return new Response(JSON.stringify({pokemonList}), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context: APIContext) => {
  try{
    const newPokemon = await context.request.json()
    addPokemon(newPokemon)
    return new Response(JSON.stringify({}), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
  catch(e){
    return new Response(JSON.stringify({}))
  }
}


