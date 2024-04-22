import { Module } from '@nestjs/common';

import { PokemonModule } from './pokemon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
