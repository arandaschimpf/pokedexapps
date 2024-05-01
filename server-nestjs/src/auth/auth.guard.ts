import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.cookies['jwt'];
    // console.log('jwt',jwt)

    if (jwt) {
      next()
    } else {
      return res.status(401).send('No autorizado')

    }
  }
}