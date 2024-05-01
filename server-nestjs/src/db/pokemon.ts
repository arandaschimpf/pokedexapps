import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';
const db = Datastore.create({ filename: './pokemon.db' });

export type Pokemon = {
    idPoke: number;
    pokemonName: string;
};

@Injectable()
export class PokemonBD {
    findOne() {
        throw new Error('Method not implemented.');
    }
    private readonly bd: Datastore<Pokemon>;

    constructor() {
        this.bd = Datastore.create({ filename: './pokemon.db', autoload: true });
    }
    async createPokemon(pokemon: Pokemon) {
        return db.insert(pokemon);
    }
    async findByPokemonName(pokemonName: string) {
        return db.findOne<Pokemon>({ pokemonName });
    }
    async findByPokemonId(idPoke: number) {
        return db.findOne<Pokemon>({ idPoke });
    }
    async findAll() {
        return db.find<Pokemon>({});
    }
    async deletePokemon(idPoke: number) {
        return db.remove({ idPoke }, {});//borra el pokemon que coincida con el nombre y el id
    }
}