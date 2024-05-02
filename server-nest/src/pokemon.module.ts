import { Module } from '@nestjs/common';
import { PokemonController1 } from './api/pokemon/[id].json';
import { PokemonController2 } from './api/pokemon/[id]'; 
import { PokemonController3 } from './api/pokemon/index.json';
import { PokemonController4 } from './api/pokemon';
import { UserServiceDB } from "./db/users"; 
import { PokemonService } from "./services/pokemon.service"; 
import { UserService } from "./services/users"; 
import { LoginController } from './api/auth';
import { SignupController } from './api/users';

@Module({
  controllers: [PokemonController1, PokemonController2, PokemonController3, PokemonController4, LoginController, SignupController], 
  providers: [PokemonService, UserService, UserServiceDB], 
})
export class PokemonModule {}