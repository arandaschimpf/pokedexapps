import type { APIRoute } from "astro"
import { addPokemon, getPokemonList } from "../../../services/pokemon"
import { handleError } from "../../api/pokemon/index"
import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../../helpers/errors";
import {findPokemon, findPokemonByName} from "../../../services/db";


export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)
  console.log("quetal get")
  
  return new Response(JSON.stringify(await getPokemonList(page)), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context) => {

    const pokemon = await context.request.json()
    /*
    let id = pokemon.id
    let name = pokemon.name    
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
    }*/
    await addPokemon(pokemon)
    return new Response(JSON.stringify(pokemon), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },    
    })



}