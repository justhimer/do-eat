import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    cors: true,
    logger: ['error', 'warn', 'log'], // <--- Add this line in options object
    rawBody: true
  });

  // apply cors to avoid crossed origins
  app.enableCors();

  // extend transfer limit
  // app.use(bodyParser.json({limit: '5mb'}));
  app.useBodyParser('json', {limit: '5mb'});

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
