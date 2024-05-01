import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtServiceModule } from 'src/user/helpers/jwt.module';
import { CookiesService } from 'src/user/helpers/redirectWithCookies.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtServiceModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [CookiesService, JwtStrategy],
})
export class AuthModule {}
