import dataStore from 'nedb-promises';

const db = dataStore.create({ filename: './users.db' , autoload: true});

export type User = {
  email: string;
  hash: string;
  salt: string;
};

export const createUser = async (user: User) => {
  return db.insert(user);
};

export const findByEmail = async (email: string) => {
  return db.findOne<User>({ email });
}