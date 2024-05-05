import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { signJWT } from 'src/helpers/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }, @Res() res: any) {
    try {
      const token = await this.authService.authenticateUser(credentials);
      res.cookie('user', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid credentials' });
    }
  }

  @Post('register')
  async register(@Body() Body: { email: string; password: string }, @Res() res: Response) {
    const user = await this.authService.createUser(Body.email, Body.password)
    const jwt = signJWT(user);

    return res.status(HttpStatus.OK).json({token:jwt});
  }
}
