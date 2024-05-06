// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module'; // Import the AuthModule
import { PokemonModule } from './pokemon.module';

@Module({
  imports: [AuthModule, PokemonModule], // Include the AuthModule here
})
export class AppModule {}
