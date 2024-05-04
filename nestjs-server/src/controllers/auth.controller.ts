// auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { signJWT } from 'src/helpers/jwt';
import { Response } from 'express';



@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() credentials: { email: string; password: string }, @Res() res: any) {
    try {
      const token = await this.authService.authenticateUser(credentials);
      // Set the token as a cookie (optional)
      res.cookie('user', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
      // Return the token in the response body
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      // Handle authentication errors
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
