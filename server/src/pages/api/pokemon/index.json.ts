import type { APIContext, APIRoute } from "astro"
import { addPokemon, getPokemonList, type Pokemon } from "../../../services/pokemon"

export const GET: APIRoute = async (context) => {
  const page =parseInt(context.url.searchParams.get('page') ?? '1', 10);

  const pokemonList = await getPokemonList();
  return new Response(JSON.stringify({pokemonList}), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*', //doy permiso a otra url
    }
  })
}

export const POST: APIRoute = async (context: APIContext) => {
  try{
    const newPokemon = await context.request.json()   //recibe un pokemon
    addPokemon(newPokemon)
    return new Response(JSON.stringify({}), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      }
    })
  }
  catch( e ){
    return new Response(JSON.stringify({}))
  };
}