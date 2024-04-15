import type { APIContext, APIRoute } from "astro"
import { addPokemon, getPokemonList } from "../../../services/pokemon"


export const GET: APIRoute = async (context) => {
  //EN que pagina estoy parado
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10);
  return new Response(JSON.stringify({
    pokemonList: await getPokemonList(page)
  }), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      //Le doy permiso al navegador para que acceda a la ruta, si no tenía eso iba a rebotar 
    }
  })
}

export const POST: APIRoute = async (context: APIContext) => {
  const pokemon = await context.request.json();
  await addPokemon(pokemon);
  return new Response(JSON.stringify({
    pokemon: pokemon
  }), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

function getFivePokemon() {
  throw new Error("Function not implemented.");
}
