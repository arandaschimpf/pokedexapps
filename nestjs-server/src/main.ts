import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const CorsOptions:CorsOptions={
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:'Content-Type,Authorization',
    credentials:true,
  };
  app.use(cookieParser());
  app.enableCors(CorsOptions);
  await app.listen(4321); // puerto que levatna 
}
bootstrap();
