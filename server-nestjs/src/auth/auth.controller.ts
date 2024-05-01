import { Controller, Post, Body, Get, UseGuards, UnauthorizedException, Res, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup.dto';
import { loginDTO } from './dto/login.dto';
import { Response } from 'express';
import cookieParser from 'cookie-parser';


@Controller('auth') //acá le decimos que la ruta de este controlador será /auth
export class AuthController {
  jwtService: any;
  constructor(
    private readonly authService: AuthService, //acá estamos trayendo/inyectando la clase service
  ) { }


  @Post('signup') //acá le decimos que la ruta de este método será /auth/signup
  signup(
    @Body() //esto sirve para "extraer" los datos que nos llegan del cliente
    signupDto: SingUpDto, //acá estamos trayendo/inyectando la clase DTO
  ) {
    return this.authService.signup(signupDto); //le enviamos al servicio los datos del registro
  }


  @Post('login')
  async login(
    @Body() loginDTO: loginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ email: string; jwt: string }> {
    try {
      const { email } = loginDTO;
      const { email: userEmail, jwt } = await this.authService.login(loginDTO);

      response.cookie('jwt', jwt, { maxAge: 60 * 60 * 24 });

      // Devolver los datos del usuario y el token como respuesta
      return { email: userEmail, jwt };
    } catch (error) {
      throw new UnauthorizedException('Error en la autenticación');
    }
  }

  // @UseGuards(AuthGuard)
  // @Get('home')
  //  //acá le decimos que esta ruta está protegida por el guard que hicimos
  // profile(@Request() req) {
  //     return req.user;

  // }

}
