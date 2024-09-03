import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Travel-Ease API')
    .setDescription(configService.get<string>('APP_DESCRIPTION'))
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const PORT = configService.get<string>('PORT');
  const logger = new Logger('Gateway');
  logger.log(`Gateway is running on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
