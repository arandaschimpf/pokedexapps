import type { APIRoute } from "astro";
import { deletePokemon } from "../../../services/pokemon";
import { getPokemonList} from "../../../services/pokemon"; 

export const DELETE: APIRoute = async (context) => {
  try {
    const idParam = context.params.id;

    // Verificar si idParam es un número
    if (typeof idParam !== 'string' && typeof idParam !== 'number') {
      throw new Error('El parámetro "id" no es válido');
    }
    const id = Number(idParam);

    if (isNaN(id)) {
      throw new Error('El parámetro "id" no es un número válido');
    }
    await deletePokemon(id);

    return new Response(JSON.stringify({ message: "Pokémon eliminado correctamente" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: unknown){
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
