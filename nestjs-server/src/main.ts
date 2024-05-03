import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PokemonModule } from './pokemon.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pokemon = await NestFactory.create(PokemonModule);
  
  const CorsOptions:CorsOptions={
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:'Content-Type,Authorization',
    credentials:true,
  };
  
  app.enableCors(CorsOptions);
  pokemon.enableCors(CorsOptions);
  await app.listen(4321);
}
bootstrap();
