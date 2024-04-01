import type { APIRoute } from "astro"
// Importa las funciones necesarias
import { getPokemonList } from '../../../services/pokemon';

// Define la función para manejar la solicitud de la lista de Pokémon en formato JSON
export async function getPokemonsJson(req: any, res: any) {
  try {
    const pokemons = await getPokemonList();
    res.json(pokemons);
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


export const GET: APIRoute = async (context) => {
  return new Response(null, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context) => {
  return new Response(null, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}