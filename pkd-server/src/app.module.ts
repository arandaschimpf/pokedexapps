import { Module } from '@nestjs/common';
import { PokemonController } from './app.controller';
import { PokemonService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb+srv://nicolasemiliogu3:admin@db.xeqsrzn.mongodb.net/',
    autoLoadEntities: true,
    synchronize: true
  }), AuthModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class AppModule {}
