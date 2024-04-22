import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/user.service';

@Module({
  imports: [UsersService],
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
