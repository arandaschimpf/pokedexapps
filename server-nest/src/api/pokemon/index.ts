import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../services/pokemon.service";
import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../helpers/errors";

@Controller("pokemon")
export class PokemonController4 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async addPokemon(@Body() body: { id: number, name: string }, @Res() res: Response) {
    const { id, name } = body;

    if (!id || !name) {
      return this.handleError(res, invalidInput, { id, name });
    }

    if (name.length > 30) {
      return this.handleError(res, nameTooLong, { id, name });
    }

    if (name.length < 3) {
      return this.handleError(res, nameTooShort, { id, name });
    }

    const existingPokemon = await this.pokemonService.findPokemonById(id) || await this.pokemonService.findPokemonByName(name);
    if (existingPokemon) {
      return this.handleError(res, pokemonAlreadyExists, { id, name });
    }

    try {
      const pokemon = { id, name };
      await this.pokemonService.addPokemon(pokemon);
      return res.redirect("/pokemons");
    } catch (error) {
      return this.handleError(res, error.message);
    }
  }

  private handleError(res: Response, error: string, body?: Record<string, any>) {
    res.cookie("error", error, { path: "/", maxAge: 1000 });
    if (body) {
      res.cookie("body", JSON.stringify(body), { path: "/", maxAge: 1000 });
    }
    return res.redirect("/pokemons");
  }
}