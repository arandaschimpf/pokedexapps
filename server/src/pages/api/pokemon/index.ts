import type { APIRoute } from "astro";
import { addPokemon } from "../../../services/pokemon";
// Importa la función para manejar la solicitud de la lista de Pokémon en formato JSON
import { getPokemonsJson } from './index.json';

// Asocia la función con la ruta
export function onRequest(req: any, res: any) {
  const { pathname } = new URL(req.url);
  
  // Ruta para obtener la lista de Pokémon en formato JSON
  if (pathname === '/') {
    return getPokemonsJson(req, res);
  }

  // Otras rutas...
}


export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const id = parseInt(data.get('id') as string)
  const name = data.get('name') as string

  if (!id || !name) {
    return context.redirect('/?error=Invalid%20input')
  }

  const pokemon = { id, name }
  await addPokemon(pokemon)

  return context.redirect('/')
}