import Datastore from "nedb-promises"
import type {Pokemon} from "./pokemon"
const db = Datastore.create({ filename: "./data/db", autoload: true})


const savePokemonDB = async (pokemon: Pokemon) => {
    return db.insert(pokemon)
}

const findPokemonDB = async (id: number) => {
    return db.findOne({id})
}
const findPokemonByNameDB = async (name: string) => {
    return db.findOne({name})
}
const getPokemonListDB = async (page: number) => {
    const count = await db.count({})
    const list = await db.find({}).skip((page -1)*5).limit(5)
    return {list, count}
}

export{savePokemonDB, findPokemonDB, findPokemonByNameDB, getPokemonListDB}