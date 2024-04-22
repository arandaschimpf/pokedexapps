import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from 'src/user/helpers/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserService, JwtService],
})
export class AuthModule {}
