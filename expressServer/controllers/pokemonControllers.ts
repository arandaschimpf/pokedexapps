import type { Request, Response } from 'express';
import { pokemonList, addPokemon, deletePokemon } from '../src/services/pokemon';

export const getPokemonListService = async (page: number = 1) => {
  try {
    if (!page) {
      return { list: pokemonList, count: pokemonList.length };
    } else {
      return { list: pokemonList.slice((page - 1) * 5, page * 5), count: pokemonList.length };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const addPokemonService = async (req: Request, res: Response) => {
  try {
    // Implementación de addPokemon utilizando la información de la solicitud
    const { id, name } = req.body;
    const pokemon = await addPokemon({ id, name });
    res.status(201).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deletePokemonService = async (req: Request, res: Response) => {
  try {
    // Implementación de deletePokemon utilizando la información de la solicitud
    const { id } = req.params;
    console.log(id)
    const pokemonId = parseInt(id);
    const deletedPokemon = await deletePokemon(pokemonId);
    res.json(deletedPokemon);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
