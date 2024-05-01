import Datastore from 'nedb-promises';
import { Injectable } from '@nestjs/common';
const db = Datastore.create({ filename: './users.db' });

export type User = {
    email: string;
    user: string;
    hash: string;
    salt: string;
};

@Injectable()
export class UsersBD {
    findByPokemonName(name: string) {
        throw new Error('Method not implemented.');
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    private readonly bd: Datastore<User>;

    constructor() {
        this.bd = Datastore.create({ filename: './users.db', autoload: true });
    }
    async createUser(user: User) {
        return db.insert(user);
    }
    async findByEmail(email: string) {
        return db.findOne<User>({ email });
    }
}

