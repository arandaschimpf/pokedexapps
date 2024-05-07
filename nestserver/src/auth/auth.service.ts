import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import type {User} from 'src/db/users';
import * as usersDB from 'src/db/users';
import { getSalt, hashPassword } from 'src/helpers/hashPassword';


// change to db later.
const sampleUsers = [
    {
        email: 'mat@gmail.com',
        password: '12345678',
    },
    {
        email: 'jane@example.com',
        password: 'password123',
    },
    {
        email: 'john@example.com',
        password: 'securepassword',
    }
]

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    //posiblemente borrar este metodo
    validateUser({email, password}: AuthPayloadDto) {
        console.log("inside validateUser")
        const findUser = sampleUsers.find((user) => user.email === email);
        if(!findUser) {
            return null;
        }
        if(password === findUser.password) {
            //sacar la password del user para no enviarla en el token
            const {password, ...user} = findUser;
            return this.jwtService.sign(user)
        }
    }

    getAllSampleUsers(){
        return sampleUsers;
    }

    async  createUser(user: { email: string, password: string }) {
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
      
        const salt = getSalt();
        const userWithHash: User = {
          email: user.email,
          hash: hashPassword(salt + user.password),
          salt
        };
      
        console.log("User has been created!")
        return usersDB.createUser(userWithHash);
        
    }

    async authenticateUser(user: { email: string, password: string }) {
        const existing = await usersDB.findByEmail(user.email);
        if (!existing) {
            throw new Error('User not found');
        }
        const hash = hashPassword(existing.salt + user.password);
        if (hash !== existing.hash) {
            throw new Error('Invalid password');
        }
        console.log("User has been found!");
        const { password, ...userWithoutPassword } = user;
        console.log(user)
        return this.jwtService.sign(userWithoutPassword);
        
    }
      
}
