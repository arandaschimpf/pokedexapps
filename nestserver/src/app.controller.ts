import { Controller, Param, Get, Delete, Post, Body, Query, Res} from '@nestjs/common'
import { Response } from 'express'
import { PokemonService, UsersService } from './app.service'
import { Pokemon, UserClient } from './app.entity'
import { redirectWithCookies } from "./users/helpers/redirectWithCookies"
import { signJWT } from "./users/helpers/jwt"

@Controller('api/auth')
export class UsersController {
  constructor(private readonly appService: UsersService) {}
  @Post('signup')
  async signUp(@Body() newUser: UserClient, @Res() res: Response) {
    try {
      await this.appService.createUser(newUser)
      return res.redirect('/api/pokemon')
    } catch (error) {
      return res.redirect('/api/auth/signup?error=true')
    }
  }

  @Post('login')
  async logIn(@Body() user: UserClient, @Res() res: Response){
    try {
      const authUser = await this.appService.authenticateUser(user)
      const jwt = signJWT(authUser)
      return redirectWithCookies('/admin', [{ name: 'user', value: jwt, maxAge: 60 * 60 * 24 }])
    } catch (error) {
      return res.redirect('api/auth/login?error=true')
    }
  }
}

@Controller('api/pokemon')
export class PokemonController {
  constructor(private readonly appService: PokemonService) {}

  @Delete(':id')
  async deletePokemon(@Param('id') id : string){
    const pokemonId = parseInt(id, 10)
    return this.appService.deletePokemon(pokemonId)
  }

  @Get()
  getAllPokemon(@Query('page') page : number){
    return this.appService.getPokemonList(page)
  } 

  @Get(':id')
  getPokemonById(@Param('id') id : number){
    return this.appService.findPokemonById(id)
  }

  @Post()
  addPokemon(@Body() newPokemon : Pokemon){
    return this.appService.addPokemon(newPokemon)
  }
}

