import type { APIRoute } from "astro";
import { getPokemonList} from "../../../services/pokemon"; 
import { addPokemon } from "../../../services/pokemon";


export const GET: APIRoute = async (context) => { //funcion para obtener datos del servidor
  try{
    const pokemonList = await getPokemonList(); //traemos la lista 
    const page = parseInt(context.url.searchParams.get('page') ?? '1', 10) //busca el número de pagina, si es null lo deja como 1

    return new Response(JSON.stringify(await getPokemonList(page)), { //devuelve la lista con el número de pagina correspondiente
      status: 200, // Código de estado 200 para indicar éxito
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: unknown){
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, // Código de estado 500 para indicar un error interno del servidor
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
  
}

export const POST: APIRoute = async (context) => { //enviar datos al servidor
  try{
    const agregar = await context.request.json(); //traemos la lista 
    await addPokemon(agregar);

    return new Response(JSON.stringify(agregar), { //devuelve la lista
      status: 200, // Código de estado 200 para indicar éxito
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: unknown){
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, // Código de estado 500 para indicar un error interno del servidor
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}