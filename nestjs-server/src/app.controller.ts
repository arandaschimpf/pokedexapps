import { Controller, Param, Get ,Delete,Post,Body,Query} from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonListResponse,Pokemon } from './pokemon.interface';

@Controller('api/pokemon')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete(':id')
  async deletePokemon(@Param('id') id:string){
    const idnew= parseInt(id,10)
    return this.appService.deletePokemon(idnew);
  }

  @Get()
  getAllPokemon(@Query('page') page: number): PokemonListResponse{
    return this.appService.getAllPokemon(page)
  } 

  @Get(':id')
  getPokemonById(@Param('id') id:number):Pokemon{
    return this.appService.getPokemonById(id);
  }

  @Post()
  addPokemon(@Body() newPokemon:Pokemon):Pokemon{
    return this.appService.addPokemon(newPokemon);
  }
}
