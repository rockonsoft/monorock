/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/shared/https-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { API_BASE } from '@monorock/api-interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = API_BASE;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Monorock API')
    .setDescription('The deployable monorepo by Rockonsoft ')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
