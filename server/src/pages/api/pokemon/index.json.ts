import type { APIRoute } from "astro"
import { addPokemon, getPokemonList } from "../../../services/pokemon"
//import { error } from "astro/dist/core/logger/core"
export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)
  return new Response(JSON.stringify(await getPokemonList(page)), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
type Pokemon = {
  id: number
  name: string
}



export const POST: APIRoute = async (context) => {
  const pokemon: Pokemon = await context.request.json();

  let error = false;
  if (pokemon.name.length < 3) {
    error = true;
  }
  if (pokemon.name.length >= 30) {
    error = true;
  }
  if (error) {
    return new Response(JSON.stringify({ error: "Invalid Pokemon data" }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
  await addPokemon(pokemon);

  return new Response(JSON.stringify(pokemon), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
