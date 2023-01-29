import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get('PORT');
  const cors = JSON.parse(configService.get('CORS'));
  app.enableCors({origin: cors})
  await app.listen(port);
}
bootstrap();
