import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PokemonModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
