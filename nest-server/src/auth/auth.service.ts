// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userService.create({...userData, password: hashedPassword});
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
