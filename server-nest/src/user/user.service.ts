import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as usersDB from './entities/user.entity';
import { HashPasswordService } from './helpers/hashPassword.service';

@Injectable()
export class UsersService {
  constructor(private hashPasswordService: HashPasswordService) {}

  async createUser(user: { email: string; password: string }) {
    if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
      throw new Error('Invalid email');
    }
    const existing = await usersDB.findByEmail(user.email);
    if (existing) {
      throw new Error('User already exists');
    }
    if (!user.password || user.password.length < 8) {
      throw new Error('Password too short');
    }

    const salt = this.hashPasswordService.getSalt();
    const userWithHash: User = {
      email: user.email,
      hash: this.hashPasswordService.hashPassword(salt + user.password),
      salt,
    };

    return usersDB.createUser(userWithHash);
  }

  async authenticateUser(user: { email: string; password: string }) {
    const existing = await usersDB.findByEmail(user.email);
    if (!existing) {
      throw new Error('User not found');
    }
    const hash = this.hashPasswordService.hashPassword(
      existing.salt + user.password,
    );
    if (hash !== existing.hash) {
      throw new Error('Invalid password');
    }
    return { email: existing.email };
  }
}
