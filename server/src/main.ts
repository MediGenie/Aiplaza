import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4300', 'http://localhost:3000'],
      credentials: true,
    },
  })) as NestExpressApplication;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  const port = process.env.NODE_ENV === 'production' ? 8080 : 5001;
  await app.listen(port);
}
bootstrap();
