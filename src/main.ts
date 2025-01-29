import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') as number;
  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap().catch((e) => console.error(e));
