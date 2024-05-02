import { Controller, Post, Body, Redirect, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Redirect('/admin', 302)
  async login(@Body() credentials: { email: string, password: string }, @Res() res: any) {
    try {
      const token = await this.authService.authenticateUser(credentials);
      res.cookie('user', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true }); 
    } catch (error) {
      return { url: '/login?error=true' }; 
    }
  }

  @Post('register')
  @Redirect('/login', 302)
  async register(@Body() credentials: { email: string, password: string }) {
    try {
      await this.authService.createUser(credentials);
    } catch (error) {
      return { url: '/signup?error=true' }; 
    }
  }
}
