// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: any[] = []; // Aquí podrías utilizar una base de datos como MongoDB, PostgreSQL, etc.

  async create(user: any) {
    this.users.push(user);
    return user;
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
}