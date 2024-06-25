import { PokemonController } from './pokemon.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';


describe('AppController', () => {
  let appController: PokemonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    appController = app.get<PokemonController>(PokemonController);
  });

  
});
