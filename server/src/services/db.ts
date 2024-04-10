// import Datastore from 'nedb-promises-ts'
// import type { Pokemon } from './pokemon'

// interface Pokemon{
//     id: number,
//     name : string
// }

// // Replicar la aplicacion Vue.js la parte del cliente. Tarea para el lunes.
// const db = Datastore.create({filename: "./data/db", autoload :true })

// const savePokemon = async (pokemon: Pokemon)=> {
//     return db.insert(pokemon)
// }

// const findPokemon = async (id: number)=> {
//     return db.FindOne(id)
// }
// const findPokemonByName = async (name: string)=> {
//     return db.FindOne(name)
// }
// const getPokemonList = async (page? : number)=> {
//     const count = await db.count({})
//     const list = await (db.find({}).skip(page-1) * 5 ).limit(5)
//     return {list, count}
// }

// export {savePokemon,findPokemon,findPokemonByName,getPokemonList}



