import Datastore from "nedb-promises"
import type { Pokemon } from "../pokemon"


const db = Datastore.create({filename: "./data/db", autoload: true});

const insertPokemon = async (pokemon : Pokemon) => {
 return db.insert(pokemon);
}



const updatePokemon = async (pokemon : Pokemon) => {
  return db.update({ id: pokemon.id }, pokemon)
}

const deletePokemon = async (pokemon : Pokemon) => {
  return db.remove({ id: pokemon.id }, {})
}


const getPokemon = async (pokemon : Pokemon) => {
  return db.find({})

}


