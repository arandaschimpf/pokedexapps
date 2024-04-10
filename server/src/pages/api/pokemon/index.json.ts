import type { APIRoute } from "astro";
import { addPokemon, getPokemonList } from "../../../services/pokemon";

interface Pokemon {
  id: number;
  name: string;
}

export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10);
  return new Response(JSON.stringify(await getPokemonList(page)), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};

export const POST: APIRoute = async (context) => {
  const pokemon = await context.request.json();

  let error1 = false;
  let error2 = false;

  if (pokemon.name.length < 3 || pokemon.name.length >= 30) { //para el nombre
    error1 = true;
  }

  const pokemonListResponse = await getPokemonList();
  const pokemonList = (pokemonListResponse as { list: Pokemon[] }).list; //castea el tipo de dato que recibe 

  if (pokemonList.some(p => p.id === pokemon.id)) { //para que no haya 2 Id iguales
    error2 = true;
  }

  if (error1 || error2) {
    const errorMessage = error1 ? "ERROR: Name too long or too short" : "ERROR: This Pokemon Id allready exists";
    return new Response(JSON.stringify({ error: errorMessage }), {
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
};
