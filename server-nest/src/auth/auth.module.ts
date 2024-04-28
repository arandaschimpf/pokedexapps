import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtServiceModule } from 'src/user/helpers/jwt.module';
import { CookiesService } from 'src/user/helpers/redirectWithCookies.service';

@Module({
  imports: [UserModule, JwtServiceModule],
  controllers: [AuthController],
  providers: [CookiesService],
})
export class AuthModule {}
