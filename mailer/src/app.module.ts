import { MailerModule } from './mailer/mailer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MAIL_PORT: Joi.string(),
        MAIL_USER: Joi.string(),
        MAIL_PASS: Joi.string(),
        MAIL_HOST: Joi.string(),
        APP_NAME: Joi.string(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
