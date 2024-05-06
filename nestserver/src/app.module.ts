import { Module } from '@nestjs/common';
import { PokemonController, UsersController } from './app.controller';
import { PokemonService, UsersService } from './app.service';

@Module({
  imports: [],
  controllers: [PokemonController, UsersController],
  providers: [PokemonService, UsersService],
})
export class AppModule {}
