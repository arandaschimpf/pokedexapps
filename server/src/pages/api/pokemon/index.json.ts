import type { APIRoute } from "astro";
import { addPokemon, getPokemonList } from "../../../services/pokemon";

export const GET: APIRoute = async (context) => {
  try {
    const pokemonList = await getPokemonList();
    
    return new Response(JSON.stringify({ pokemonList }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) { // Specify 'any' type for error
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const pokemon = await context.request.json();
    await addPokemon(pokemon);
    
    return new Response(JSON.stringify({ pokemon }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) { // Specify 'any' type for error
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
