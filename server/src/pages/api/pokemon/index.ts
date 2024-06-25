// server/src/pages/api/pokemon/index.ts

import type { APIRoute } from "astro";
import { getPokemonList, addPokemon } from "../../../services/pokemon";

export const GET: APIRoute = async (context) => {
  try {
    const pokemonList = await getPokemonList();

    return new Response(JSON.stringify(pokemonList), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) { // Aquí indicamos que "error" puede ser de tipo "any"
    console.error('Error obteniendo la lista de Pokémon:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const data = await context.request.formData();
    const id = parseInt(data.get('id') as string, 10);
    const name = data.get('name') as string;

    if (!id || !name) {
      throw new Error('Invalid input');
    }

    const pokemon = { id, name };
    await addPokemon(pokemon);

    return new Response(JSON.stringify(pokemon), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) { // Aquí indicamos que "error" puede ser de tipo "any"
    console.error('Error adding Pokemon:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};