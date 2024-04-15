// import Datastore from "nedb-promises-ts"
// const db = new Datastore({filename: "./data/db", autoload: true})

// interface Pokemon {
//     id: number,
//     name: string
// }

// const savePokemon = async (pokemon: Pokemon) => {
//     return db.insert(pokemon);
// }

// const findPokemon = async (id: number) => {
//     return db.findOne({id});
// } 

// const findPokemonByName = async (name: string) => {
//     return db.findOne({name});
// }

// const getPokemonList = async (page: number) => {
//     const count = await db.count({});
//     const list = await db.find({}).skip((page - 1) *5).limit(5);
//     return {list, count}
// }


// export{savePokemon, findPokemon, findPokemonByName, getPokemonList}

//Hacer esto mismo con solidjs
//
//