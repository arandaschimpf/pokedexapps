import { Injectable , CanActivate , ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { verifyJWT } from "./helpers/jwt";


@Injectable()

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader){
            throw new UnauthorizedException("Authorization header is missing")
        }

        const [bearer,token] = authorizationHeader.split(' ');

        if (bearer !== 'Bearer' || !verifyJWT(token)){
            throw new UnauthorizedException('Invalid or missing JWT token');
        }
        return true;
    }
}