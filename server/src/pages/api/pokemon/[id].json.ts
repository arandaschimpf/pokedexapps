import type { APIRoute } from "astro";
import { deletePokemon } from "../../../services/pokemon";

export const DELETE: APIRoute = async (context) => {
  try {
    const pokemonId = parseInt(context.params.pokemonId); 
    
    await deletePokemon(pokemonId);
    
    return new Response(JSON.stringify({}), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}