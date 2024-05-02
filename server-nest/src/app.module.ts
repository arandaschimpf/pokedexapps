import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PokemonModule } from './pokemon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './api/ayn';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log("middleware funcionando correctamente");
    consumer.apply(AuthMiddleware).forRoutes('/pokemon');
  }
}