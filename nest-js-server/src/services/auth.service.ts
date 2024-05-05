import { Injectable } from '@nestjs/common';
import { User } from '../db/users';
import * as usersDB from '../db/users';
import { getSalt, hashPassword } from '../helpers/hashPassword';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class AuthService {
  async createUser(email: string, password: string): Promise<{ user: User; token: string }> {
    if (!email || email.length < 5 || !email.includes('@')) {
      throw new Error('Invalid email');
    }

    const existingUser = await usersDB.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    if (!password || password.length < 8) {
      throw new Error('Password too short');
    }

    const salt = getSalt();
    const hashedPassword = hashPassword(salt + password);

    const userWithHash: User = {
      email: email,
      hash: hashedPassword,
      salt: salt
    };

    const newUser = await usersDB.createUser(userWithHash);

    const token = jwt.sign({ email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });

    return { user: newUser, token: token };
  }

  async authenticateUser(user: { email: string, password: string }): Promise<{ email: string }> {
    const existingUser = await usersDB.findByEmail(user.email);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const hashedPassword = hashPassword(existingUser.salt + user.password);
    if (hashedPassword !== existingUser.hash) {
      throw new Error('Invalid password');
    }

    return { email: existingUser.email };
  }
}