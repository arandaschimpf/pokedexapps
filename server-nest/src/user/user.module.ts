import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashPasswordService } from './helpers/hashPassword.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashPasswordService],
})
export class UserModule {}
