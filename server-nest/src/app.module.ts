import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PokemonModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
