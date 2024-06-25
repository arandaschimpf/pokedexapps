import { PokemonModule } from './pokemon.module';
import { NestFactory } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(PokemonModule);
  // Configurar CORS
  app.enableCors({
    origin: '*', // o cambia '*' por la URL específica desde donde deseas permitir las solicitudes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(3000);
}
bootstrap();
