// src/db.ts
import Datastore from "nedb-promises";
import type { Pokemon } from "../types";

const db = Datastore.create({ filename: "./data/db", autoload: true });

const savePokemon = async (pokemon: Pokemon) => {
    return db.insert(pokemon);
};

const findPokemonByEmail = async (email: string) => {
    return db.findOne({ email});
};

const getPokemonList = async (page: number = 1) => {
    const count = await db.count({});
    const list = await db.find({}).skip((page - 1) * 5).limit(5);
    return { list, count };
};

export { savePokemon, findPokemonByEmail, getPokemonList };
