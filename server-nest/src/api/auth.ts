import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/users';
import { JwtService } from '../helpers/jwt';
const jwtService = new JwtService();
const userService = new UserService();
@Controller('login')
export class LoginController {
  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      const user = await userService.authenticateUser({ email, password });
      const jwt = jwtService.signJWT(user);
      res.cookie("user", jwt, { maxAge: 60 * 60 * 24 });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(401).json({ success: false, message: 'error' }); 
    }
  }
}