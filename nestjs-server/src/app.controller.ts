import { Controller, Param, Get ,Delete,Post,Body,Query, Req, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import { PokemonListResponse,Pokemon } from './pokemon.interface';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

// decoradores. 
@Controller('api/pokemon') 
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete(':id')
  async deletePokemon(@Param('id') id:string){
    const idnew= parseInt(id,10)
    return this.appService.deletePokemon(idnew);
  }

  // GUARD: inyectar en todo el controlado, deja y no correrlo.

  @Get()
  getAllPokemon(@Query('page') page: number, @Req() req: Request): PokemonListResponse{
    //const [bearer, token] = req.headers.authorization?.split(' ')
    //if (bearer === 'Bearer' && verifyJWT(token)) {
    return this.appService.getAllPokemon(page)
    //}
    // return 401
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
