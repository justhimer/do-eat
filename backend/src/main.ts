import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log'] // <--- Add this line in options object
});

  // apply cors to avoid crossed origins
  app.enableCors();

  /***************************/
  /*** Swagger Setup Start ***/
  /***************************/
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // validation pipe
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api', app, document);

  /*************************/
  /*** Swagger Setup End ***/
  /*************************/

  /**********************/
  /*** Port Listening ***/
  /**********************/
  await app.listen(3000);
}
bootstrap();
