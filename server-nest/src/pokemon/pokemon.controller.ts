import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtGuard)
@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Post()
  create(@Body(ValidationPipe) newPokemon: CreatePokemonDto) {
    return this.pokemonService.createPokemon(newPokemon.id, newPokemon.name);
  }

  @Get()
  async getAllPokemon(@Query('page') page: number) {
    const pageNumber = page ? page : 1;
    const response = {
      count: await this.pokemonService.pokemonPage(),
      list: await this.pokemonService.getAllPokemon(pageNumber),
    };
    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.deletePokemon(id);
  }
}
