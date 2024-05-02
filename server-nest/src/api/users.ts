import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from "../services/users"; 

const userService = new UserService();

@Controller('signup')
export class SignupController {
  @Post()
  async createUser(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {

      const useradd = await userService.createUser({ email, password }); 
      return res.status(HttpStatus.CREATED).json(useradd);

  }
}