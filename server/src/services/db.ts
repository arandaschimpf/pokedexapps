import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";

const db = Datastore.create({filename: './data/db', autoload: true});

const savePokemon = async (pokemon: Pokemon) => {
    return db.insert(pokemon);
}

const findPokemon = async (id:number) => {
    return db.findOne({id: id});
}

const deletePokemon = async (id:number) => {
    return db.remove({id: id}, {});
}

const getFivePokemon = async (page:number) => {
    return db.find({}).skip(5*page).limit(5);
}