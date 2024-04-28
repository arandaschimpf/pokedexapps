import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { redirectWithCookies } from 'src/helpers/redirectWithCookies';
import { signJWT } from 'src/helpers/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authenticateUser(@Body() body:{email:string , password:string }, @Res() res:Response) {
    try{
      const user = this.authService.authenticateUser(body.email,body.password);
      const jwt = signJWT(user) // generar token
      return redirectWithCookies('/admin', [{name:'user', value: jwt , maxAge: 60*60*24}])

    }catch(error){
      return res.redirect('/login?error=true');
    }
  }
}
