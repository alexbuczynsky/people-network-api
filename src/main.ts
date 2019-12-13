import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  PORT,
  GLOBAL_ROUTE_PREFIX,
} from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_ROUTE_PREFIX);

  const options = new DocumentBuilder()
    .setTitle('People Network API')
    .setDescription('An example of a people network api')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
