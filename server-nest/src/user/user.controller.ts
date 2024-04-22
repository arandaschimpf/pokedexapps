import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async signUp(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;

    try {
      await this.usersService.createUser({ email, password });
      return res.redirect('/login');
    } catch (error) {
      return res.redirect('/signup?error=true');
    }
  }
}
