import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PokeDatos } from './dto/pok.dto';

@Controller('pokemon')
export class AppController {
  constructor(private readonly appService: AppService) { } //acá estamos trayendo/inyectando la clase service

  @Get()
  async listPokemon(@Query('page') page: string) {
    const pageNumber = Number(page);
    return await this.appService.listPokemon(pageNumber);
  }

  @Post()
  createPokemon(
    @Body() newPoke: PokeDatos,

  ) {
    return this.appService.createPokemon(newPoke);
  }

  @Delete(':idPoke')
  async deletePokemon(@Param('idPoke') id: string) {
    const numId = Number(id); //esto siempre tiene que ir para que el id sea un número, cuando usamos PARAM se devuelve una cadena de string :))))))))
    console.log('se eliminooo')
    console.log(numId)
    return await this.appService.deletePokemon(numId);

  }
}


