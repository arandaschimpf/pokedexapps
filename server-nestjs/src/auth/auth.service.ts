import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersBD } from 'src/db/users';
import { SingUpDto } from './dto/singup.dto';
import { getSalt, hashPassword } from 'src/helpers/hashPassword';
import { loginDTO } from './dto/login.dto';
import { signJWT } from 'src/helpers/jwt'; // Asegúrate de que la ruta sea correcta


@Injectable()
export class AuthService {



    BDUserService = new UsersBD(); //traemos los servicios de BD

    constructor() { }

    async signup({ email, user, contra }: SingUpDto) {

        const usario = await this.BDUserService.findByEmail(email); //acá estamos buscando si el usuario ya existe con el método que tenemos de la bd

        if (usario) {
            throw new BadRequestException('El usuario ya existe'); //usamos el manejo de errores de nestjs
        }
        const salt = getSalt(); //generamos una cadena aleatoria de 16 bytes
        return await this.BDUserService.createUser(
            {
                email,
                user,
                hash: hashPassword(contra + salt),
                salt
            });
    }

    async login({ email, contra }: loginDTO) {
        const usuario = await this.BDUserService.findByEmail(email); //acá estamos buscando si el usuario ya existe con esl método que tenemos de la bd

        if (!usuario) {
            throw new UnauthorizedException('datos incorrectos'); //usamos el manejo de errores de nestjs, estamos diciendo que si el usuario no exise, entonces no esta autorizado
        }
        const hash = hashPassword(contra + usuario.salt); //encriptamos la contraseña que nos llega del cliente
        if (hash !== usuario.hash) { //comparamos la contraseña encriptada con la contraseña encriptada que tenemos en la bd
            throw new UnauthorizedException('datos incorrectos'); //usamos el manejo de errores de nestjs, estamos diciendo que si la contraseña no coincide, entonces no esta autorizado
        }

        const datos = { email: usuario.email, user: usuario.user }; //creamos un objeto con los datos que queremos enviar en el token
        const jwt = signJWT(datos); //creamos el token con los datos que queremos enviar, esto nos sirve para que el cliente pueda acceder a las rutas que estan protegidas :0
        return {
            email: usuario.email,
            jwt
        }

    }


}
