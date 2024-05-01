import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './app.controller';
import { PokemonService } from './app.service';

describe('PokemonController', () => {
  let pokemonControler: PokemonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonControler = app.get<PokemonController>(PokemonController);
  });

});
