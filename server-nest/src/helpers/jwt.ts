import jwt from "jsonwebtoken"
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  private readonly secret: string = 'mysecret';

  signJWT(payload: any): string {
    return jwt.sign(payload, this.secret);
}


verifyJWT(token: string): any {
  try {
    return jwt.verify(token, this.secret);
  } catch (error) {
    console.error('error de verificación JWT:', error.message);
    return null;
  }
}
}