// pokemon.module.ts
import { Module } from '@nestjs/common';
import { PokemonController } from '../src/controllers/app.controller';
import { PokemonService } from './services/app.service'; 

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
