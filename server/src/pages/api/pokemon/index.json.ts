import type { APIRoute } from "astro"
import { addPokemon, getPokemonList } from "../../../services/pokemon"

import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../../helpers/errors";
import {findPokemon, findPokemonByName} from "../../../services/db";

function handleError(error: string, body?: Record<string, any>) {
  const e = {error}
  console.log("error: ", e);
  
  return new Response(JSON.stringify({error}), {
    status:400,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)
  
  
  return new Response(JSON.stringify(await getPokemonList(page)), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context) => {
  
    const {id, name} = await context.request.json() //ºdesestructurar
    
  
    if (!id || !name) {
      return handleError(invalidInput, { id, name })
    }
  
    if (name.length > 30) {
      return handleError(nameTooLong, { id, name })
    }
  
    if (name.length < 3) {
      return handleError(nameTooShort, { id, name })
    }
  
    if (await findPokemon(id) || await findPokemonByName(name)) {
      return handleError(pokemonAlreadyExists, { id, name })
    }
    
    const poke = await addPokemon(pokemon)
    return new Response(JSON.stringify(poke), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },    
    })



}