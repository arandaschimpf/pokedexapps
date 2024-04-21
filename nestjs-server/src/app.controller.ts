import { Controller, Param, Get ,Delete,Post,Body,Query} from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonListResponse,Pokemon } from './pokemon.interface';

@Controller('api/pokemon')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete(':id')
  async deletePokemon(@Param('id') id:number){
    return this.appService.deletePokemon(id);
  }

  @Get()
  getAllPokemon(@Query('page') page: number , @Query('pageSize') pageSize:number): PokemonListResponse{
    return this.appService.getAllPokemon(page,pageSize)
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
