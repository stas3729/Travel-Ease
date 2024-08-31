import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<string>('PORT');
  const logger = new Logger('Gateway');
  logger.log(`Gateway is running on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
