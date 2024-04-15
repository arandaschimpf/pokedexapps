import type { APIRoute } from "astro"
import { addPokemon, getPokemonList, findPokemonById ,findPokemonByName } from "../../../services/pokemon"
import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../../helpers/errors"


// function handleError(error: string, body?: Record<string, any>) {
//   const headers = new Headers()
//   headers.append('Location', '/')
//   headers.append('Set-Cookie', `error=${error}; SameSite=Strict; Path=/; Max-Age=1`)
//   if (body) {
//     headers.append('Set-Cookie', `body=${JSON.stringify(body)}; SameSite=Strict; Path=/; Max-Age=1`)
//   }
//   return new Response(null, {
//     status: 302,
//     headers: headers
//   })
// }

function handleError(errorType : string, details = {}){
  return new Response(JSON.stringify({error: errorType}), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
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

  const data = await context.request.json();  
  const id = data.id
  const name = data.name
  
  if (!id || !name) {
    return handleError(invalidInput, { id, name })
  }

  if (name.length > 20) {
    return handleError(nameTooLong, { id, name })
  }

  if (name.length < 3) {
    return handleError(nameTooShort, { id, name })
  }

  if (await findPokemonById(id) || await findPokemonByName(name)) {
    return handleError(pokemonAlreadyExists, { id, name })
  }

  const pokemon = { id, name }
  await addPokemon(pokemon)

  return new Response(JSON.stringify(pokemon), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}