const Datastore = require('nedb-promises')
const db = Datastore.create("./data/db");

interface Pokemon {
    id: number;
    name: string;
}



const savePokemon = async (pokemon: Pokemon) => {
    return db.insert(pokemon);
}

const findPokemonDB = async (id: number) => {
    return db.findOne({ id });
}

const findPokemonByNameDB = async (name: string) => {
    return db.insert({ name });
}

const getPokemonListDB = async (page: number = 1) => {
    const count = await db.count({});
    const list = await db.find({}).skip((page - 1) * 5).limit(5);
    return { list, count };
}

const deletePokemonDB = async (pokemonId: number) => {
    const deletedPokemon = await db.findOneAndRemove({ pokemonId });
}

export { savePokemon, findPokemonDB, findPokemonByNameDB, getPokemonListDB, deletePokemonDB };



//hay que hacer un nuevo cliente con solid js
//para el juego vamos a usar next js con App Router