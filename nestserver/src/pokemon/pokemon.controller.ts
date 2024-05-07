import { Controller, Get, Body, Post, Param, Delete, Query} from '@nestjs/common';
import { PokemonDto } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';


@Controller('pokemon')
export class PokemonController {

    constructor(private pokemonService: PokemonService){}

    @Get()

    async getPokemonList(@Query('page') page: number){
        const list = await this.pokemonService.getPokemonList(page);
        return list;
    }

    @Post('addPokemon')
    async addPokemon(@Body() pokemon: PokemonDto){
        const newPokemon = await this.pokemonService.addPokemon(pokemon);
        return newPokemon;
    }
    
    @Delete('deletePokemon/:id')
    async deletePokemon(@Param() params: any){
        const id = Number(params.id);
        console.log(id)
        const deletedPokemon = await this.pokemonService.deletePokemon(id);
        return deletedPokemon;
    }  
    
    

}
