import { Controller, Post, Body,Res, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body :{email:string , password:string},@Res() res:Response) {
    // try{
    await this.usersService.createUser(body.email , body.password)
    return res.status(HttpStatus.OK).send('Exito');
    //return res.status(HttpStatus.FOUND).redirect('/login');
    //return res.redirect('/login');
    // }catch (error){
    //return res.redirect('/signup?error=true')
    // }
  }
}
