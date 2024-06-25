import Datastore from "nedb-promises-ts";
import type { Pokemon } from "./pokemon";
const db = new Datastore({ filename: "./data/db", autoload: true })

const getAll = async () => (
    db.loadDatabase()
)
const savePokemon = async (pokemon: Pokemon) => (
    db.insert(pokemon)
)

const findById = async (id : number) => (
    db.findOne((id))
)

const findByName = async (name : string) => (
    db.findOne(name)
)

const deletePokemon = async (pokemonId: number) => (
    db.remove(findById(pokemonId))
)