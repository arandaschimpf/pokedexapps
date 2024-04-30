import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { signJWT } from 'src/helpers/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticateUser(@Body() body:{email:string , password:string }, @Res() res:Response) {
      const user = await this.authService.authenticateUser(body.email,body.password);
      const jwt = signJWT(user) // generar token
      res.cookie('user',jwt, {maxAge: 60*60*24});
      return res.status(HttpStatus.OK).json({token:jwt});
      //return res.status(HttpStatus.FOUND).redirect('/home')
      // }catch(error){
    //   return res.redirect('/login?error=true');
    // }
  }
}
