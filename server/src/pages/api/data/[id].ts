import type { APIRoute } from "astro";
import { deleteData } from "../../../services/data";

export const POST: APIRoute = async (context) => {
  const id = parseInt(context.params.id!, 10)

  await deleteData(id)

  return context.redirect('/')
}