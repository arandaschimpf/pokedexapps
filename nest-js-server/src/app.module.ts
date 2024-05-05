import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module'; 
import { PokemonModule } from './poke.module';

@Module({
  imports: [AuthModule, PokemonModule]
})
export class AppModule {}
