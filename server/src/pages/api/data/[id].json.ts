import type { APIRoute } from "astro";
import { deleteData } from "../../../services/data";

export const DELETE: APIRoute = async (context) => {
  const id = parseInt(context.params.id ?? '0', 10)
  const data = await deleteData(id)
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}