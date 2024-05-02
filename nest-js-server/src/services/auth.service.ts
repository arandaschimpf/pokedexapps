import { Injectable } from '@nestjs/common';
import { User } from '../db/users';
import * as usersDB from '../db/users';
import { getSalt, hashPassword } from '../helpers/hashPassword';

@Injectable()
export class AuthService {
  async createUser(user: { email: string, password: string }): Promise<void> {
    if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
      throw new Error('Invalid email');
    }

    const existingUser = await usersDB.findByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    if (!user.password || user.password.length < 8) {
      throw new Error('Password too short');
    }

    const salt = getSalt();
    const hashedPassword = hashPassword(salt + user.password);

    const userWithHash: User = {
      email: user.email,
      hash: hashedPassword,
      salt: salt
    };

    await usersDB.createUser(userWithHash);
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
