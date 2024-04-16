import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";

const db = Datastore.create({filename: './data/db.db', autoload: true});

export const savePokemon = async (pokemon: Pokemon) => {
    return db.insert(pokemon);
}

export const findPokemon = async (id:number) => {
    return db.findOne({id: id});
}

export const deletePokemon = async (id:number) => {
    return db.remove({id: id}, {});
}

export const getFivePokemon = async (page:number) => {
    const allPokemon = await db.find({});
    const pokemonSlice = allPokemon.slice(5 * (page - 1), 5 * page);
    return pokemonSlice;
}