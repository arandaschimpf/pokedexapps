import { Controller, Post, Body, HttpException, UseGuards, Get} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {} // injectar auth.service

    @Post('login')
    //@UseGuards(LocalGuard)
    async login(@Body() authPayload: AuthPayloadDto) {
        console.log("inside login function nest")
       const user = await this.authService.authenticateUser(authPayload);
       if(!user) {
           throw new HttpException('Usuario Invalido', 401);
       }
       console.log("hello from login controller")
       console.log(user)
       return user;
    }


    @Post('signup')
    async signup(@Body() authPayload: AuthPayloadDto) {
        console.log("inside signinfunction nest")
        const user = await this.authService.createUser(authPayload);
        console.log("inside signup controller")
        return user;
    }

    //this get is just to check if the url is working
    @Get('login')
    async loginTest() {
        const list = await this.authService.getAllSampleUsers();
        return list;
    }
}