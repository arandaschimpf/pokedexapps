import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";

const db = Datastore.create({ filename: './data/db.db', autoload: true });

export const savePokemon = async (pokemon: Pokemon) => {
    const existingPokemonById = await findPokemonById(pokemon.id) ? pokemon.id : null;

    const existingPokemonByName = await findPokemonByName(pokemon.name) ? pokemon.name : null;

    if (existingPokemonById || existingPokemonByName) {
        throw new Error("El Pokémon ya existe con el mismo ID o nombre.");
    }

    return db.insert(pokemon);
}

export const findPokemonById = async (id: number) => {
    return db.findOne({ id: id });
}

export const findPokemonByName = async (name: string) => {
    return db.findOne({ name: name });
};

export const deletePokemon = async (id: number) => {
    return db.remove({ id: id }, {});
}

export const getFivePokemon = async (page: number) => {
    const allPokemon = await db.find({});
    const pokemonSlice = allPokemon.slice(5 * (page - 1), 5 * page);
    return pokemonSlice;
}