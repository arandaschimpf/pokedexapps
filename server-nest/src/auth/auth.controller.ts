import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from 'src/user/helpers/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
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
      return (
        res
          .status(200)
          // .cookie('user', jwt, {
          //   maxAge: 60 * 60 * 24 * 1000,
          //   httpOnly: false,
          //   domain: 'localhost:5173',
          //   sameSite: 'none',
          //   secure: false,
          // })
          .send({
            accessToken: jwt,
          })
      );
    } catch (error) {
      return res.redirect('/login?error=true');
    }
  }
}
