import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './pokemon/app.controller';
import { AppService } from './pokemon/app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/pokemon')
  }
}

