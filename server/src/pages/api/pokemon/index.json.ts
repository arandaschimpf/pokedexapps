import type { APIRoute } from "astro";
import { getPokemonList, addPokemon } from "../../../services/pokemon";

export const GET: APIRoute = async (context) => {
  const pokemonList = await getPokemonList().catch(error => {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  });

  return new Response(JSON.stringify(pokemonList), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};

export const POST: APIRoute = async (context) => {
  const requestBody = await context.request.json().catch(error => {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  });

  const newPokemon = await addPokemon(requestBody).catch(error => {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  });

  return new Response(JSON.stringify(newPokemon), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};
