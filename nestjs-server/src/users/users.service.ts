import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import{User} from "./entities/user.entity";
import * as userDB from './entities/user.entity';

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

    const salt = this.getSalt();
    const userWithHash : User = {
      email: email, 
      hash : this.hashPassword(salt + password),
      salt
    };

    return userDB.createUser(userWithHash);
    
  }
  getSalt() {
    return Crypto.randomBytes(16).toString('hex');
  }

  hashPassword(password:string){
    return Crypto.createHash('sha256').update(password).digest('hex');
  }

}




  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
