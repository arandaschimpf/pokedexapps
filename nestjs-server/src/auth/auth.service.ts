import { Injectable } from '@nestjs/common';
import * as usersDB from '../users/entities/user.entity'
import { hashPassword } from 'src/helpers/hashPassword';

@Injectable()
export class AuthService {
  async authenticateUser(email:string, password:string ) {
    const existing = await usersDB.findByEmail(email);

    if (!existing){
      throw new Error('User not found');
    }

    const hash = hashPassword(existing.salt + password);
    if (hash !== existing.hash){

      throw new Error('Invalid password');
    }
    return {email: existing.email}
  }
}
