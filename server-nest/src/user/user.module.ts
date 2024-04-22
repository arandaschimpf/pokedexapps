import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { HashPasswordModule } from './helpers/hashPassword.module';

@Module({
  imports: [HashPasswordModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
