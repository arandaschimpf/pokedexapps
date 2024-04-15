import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";
const db = Datastore.create({ filename: "./data/db", autoload: true})

const savePokemon = async(pokemon: Pokemon) =>{
    return db.insert(pokemon)
}

const findPokemon = async(id:Pokemon) =>{
    return db.find(id)
}

const findByName = async(name:Pokemon) =>{
    return db.find(name)
}

const getPokemon = async (page = 1, perPage = 5) => {
    const skip = (page - 1) * perPage;
    const pokemonList = await db.find({}).skip(skip).limit(perPage).exec();
    return pokemonList;
}

const deletePokemon = async(id: number) =>{
    //const index = db. Completar despues
}