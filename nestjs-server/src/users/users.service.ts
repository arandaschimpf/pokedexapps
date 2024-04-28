import { Injectable } from '@nestjs/common';
import{User} from "./entities/user.entity";
import * as userDB from './entities/user.entity';
import { getSalt, hashPassword } from 'src/helpers/hashPassword';

@Injectable()
export class UsersService {
  async createUser(email:string , password:string ):Promise<User> {
    
    if (!email || email.length < 5 || !email.includes('@')){
      throw new Error("Invalid email");
    }

    const existingUser = await userDB.findByEmail(email);
    if (existingUser){
      throw new Error('User already exists');
    }
  
    if (!password || password.length < 8 ){
      throw new Error('Password too short');

    }

    const salt = getSalt();
    const userWithHash : User = {
      email: email, 
      hash : hashPassword(salt + password),
      salt
    };

    return userDB.createUser(userWithHash);
    
  }
}
