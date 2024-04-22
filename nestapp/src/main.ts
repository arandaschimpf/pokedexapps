import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cors from 'cors';// me tiraba error, tuve que instalarlo con npm install cors pero igual no funciona.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();
  // app.use(cors());

  await app.listen(3000);
}
bootstrap();
