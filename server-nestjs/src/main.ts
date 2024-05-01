import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors(
   {credentials: true, 
    origin: 'http://localhost:5173' ,
    } 
  ); // Enable CORS

  app.useGlobalPipes( 
    new ValidationPipe({ //esto es para que funcione lo de las validaciones
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  await app.listen(3000);

}
bootstrap();
