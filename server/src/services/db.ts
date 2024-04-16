import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";

const db = Datastore.create({ filename: "./data/db" });

const savePokemon = async (pokemon: Pokemon) => {
    return db.insert(pokemon);
}

const findPokemon = async (id: number) => {
    return db.findOne({ id });
}

const findPokemonByName = async (name: string) => {
    return db.insert({ name });
}

const getPokemonList = async (page: number =1) => {
    if (page !== undefined) {
        const count = await db.count({});
        const list = await db.find({}).skip((page - 1) * 5).limit(5);
        return { list, count };
    } else {
        // handle the case when page is undefined
        // for example, return an error or a default result
    }
}

export { savePokemon, findPokemon, findPokemonByName, getPokemonList };