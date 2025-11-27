import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API Simples Escolhas")
    .setDescription("Uma api para gerenciamento de pequenas eleições")
    .setVersion("1.0")
    .addTag("auth")
    .addTag("election")
    .addTag("electoral-slate")
    .addTag("user")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  writeFileSync(
    path.join(__dirname, '..', 'swagger.json'),
    JSON.stringify(document, null, 2),
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter);
  await app.listen(3000);







}
bootstrap();
