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
      await this.usersService.createUser(user);
      return res.redirect('/auth/login');
    } catch (error) {
      return res.redirect('signup?error=true');
    }
  }
}
