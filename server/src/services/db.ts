import Datastore from 'nedb-promises'
import type { Pokemon } from './pokemon.ts'

interface pokemon{
    id: number,
    name : string
}

// Replicar la aplicacion a Vue.js, la parte del cliente (React). Tarea para el lunes.
const db = Datastore.create({filename: "./data/db", autoload :true })

const savePokemon = async (pokemon: Pokemon)=> {
    return db.insert(pokemon)
}

const findPokemon = async (id: number)=> {
    return db.findOne({id : id})
}
const findPokemonByName = async (name: string)=> {
    return db.findOne({name : name})
}

const getPokemonList = async (page? : number)=> {
    const count = await db.count({})
    const list = await db.find({}).skip((page ? page -1 : 0) * 5 ).limit(5)
    return {list, count}
}

export {savePokemon,findPokemon,findPokemonByName,getPokemonList}


