import { Controller, Post, Param, Res, Redirect } from "@nestjs/common";
import { PokemonService } from "../../services/pokemon.service";

@Controller("pokemon")
export class PokemonController2 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post(":id")
  @Redirect("/")
  async deletePokemon(@Param("id") id: string) {
    const pokemonId = parseInt(id, 10);
    await this.pokemonService.deletePokemon(pokemonId);
  }
}