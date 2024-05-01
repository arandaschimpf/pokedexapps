import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as usersDB from '../../user/entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mysecret',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await usersDB.findByEmail(payload.email);
    delete user.hash;
    delete user._id;
    return user;
  }
}