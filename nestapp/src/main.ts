import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();
  app.use(cors({
    origin: '*', // Configura los orígenes permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Configura los métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Configura los encabezados permitidos
  }));


  await app.listen(4321);
}
bootstrap();
