import { Module } from '@nestjs/common';

import { PokemonModule } from './pokemon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SignupController } from './pages/api/users';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
