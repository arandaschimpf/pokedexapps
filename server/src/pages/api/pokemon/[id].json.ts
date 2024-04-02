import type { APIRoute, APIContext } from "astro";
import { deletePokemon } from "../../../services/pokemon";

export async function DELETE(context: APIContext) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const id = context.params.id;
  const parsedId = parseInt(id!, 10);
  const deletedPokemon = await deletePokemon(parsedId);

  if (deletedPokemon) {
    return new Response(
      JSON.stringify({ deletedPokemon }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ error: "Pokémon not found" }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
