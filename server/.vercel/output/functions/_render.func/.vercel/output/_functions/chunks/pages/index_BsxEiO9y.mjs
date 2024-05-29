import { g as getPokemonList, a as addPokemon } from './_id__DitQkfXA.mjs';

const GET = async (context) => {
  const pokemonList = await getPokemonList();
  return new Response(JSON.stringify({ pokemonList }), {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
const POST = async (context) => {
  try {
    const newPokemon = await context.request.json();
    addPokemon(newPokemon);
    return new Response(JSON.stringify({}), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({}));
  }
};

export { GET, POST };
