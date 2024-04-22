import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/user/user.service';
import { JwtService } from 'src/user/helpers/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;

    try {
      const user = await this.usersService.authenticateUser({
        email,
        password,
      });
      const jwt = this.jwtService.signJWT(user);
      res.cookie('user', jwt, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
      return res.redirect('/admin');
    } catch (error) {
      return res.redirect('/login?error=true');
    }
  }
}
