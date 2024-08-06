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
        MAIL_PORT: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        APP_NAME: Joi.string().required(),
      }),
      ignoreEnvFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
