import { Controller, Post, Res, Body, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) user: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      console.log('ayuda');
      await this.usersService.createUser(user);
      return res.status(200).send(true);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
