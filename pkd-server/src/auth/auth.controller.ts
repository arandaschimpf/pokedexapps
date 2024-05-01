import { Body, Controller, Get, Post, Req, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import signJWT from '@nestjs/jwt'
import { request } from 'https';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(
        @Body()
        registerDTO: RegisterDTO
    ){
        return this.authService.register(registerDTO);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body()
        loginDto: LoginDto,
        @Res()
        response: Response

    ){
        try {
            const token = await this.authService.login(loginDto);
    
            // Establecer la cookie con el token JWT
            response.cookie('user', token, { maxAge: 60 * 60 * 24, httpOnly: true, sameSite: true });
    
            // Respuesta exitosa
            return response.status(200).json({ success: true, token });
        } catch (error) {
            // Autenticación fallida
            return response.status(401).json({ success: false, message: error.message });
        }

    }
}
