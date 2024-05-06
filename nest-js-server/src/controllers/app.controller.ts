import { Controller, Param, Get ,Delete,Post,Body,Query} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PokemonListResponse,Pokemon } from '../interfaces/pokemon.interface';

@Controller('api/pokemon')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete(':Pokemonid')
  async deletePokemon(@Param('Pokemonid') id:string){
    const idnew= parseInt(id,10)
    return this.appService.removePokemon(idnew);
  }

  @Get()
  fetchAllPokemon(@Query('page') page: number): PokemonListResponse{
    return this.appService.fetchAllPokemon(page)
  } 

  @Get(':id')
  getPokemonById(@Param('Pokemonid') id:number):Pokemon{
    return this.appService.getPokemonById(id);
  }

  @Post()
  addPokemon(@Body() newPokemon:Pokemon):Pokemon{
    return this.appService.CreatePokemon(newPokemon);
  }
}


