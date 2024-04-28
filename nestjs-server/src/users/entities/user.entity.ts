import Datastore from 'nedb-promises';

const db = Datastore.create({filename: './users.db', autoload: true})

export class User {

    email : string;
    hash: string;
    salt: string;

}

export async function createUser(user:User): Promise<User>{
    return db.insert(user);
}
export async function findByEmail(email:string):Promise<User | null> {
    return db.findOne<User> ({email});

}

