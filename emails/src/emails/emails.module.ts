import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailsMicroserviceController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        FROM_NAME: Joi.string().required(),
        FROM_ADDRESS: Joi.string().required(),
        EMAIL_SUBJECT: Joi.string().required(),
        EMAIL_AUTH_USER: Joi.string().required(),
        EMAIL_AUTH_PASS: Joi.string().required(),
        WELCOME_TEXT: Joi.string().required(),
      }),
    }),
  ],
  controllers: [EmailsMicroserviceController],
  providers: [EmailsService],
})
export class EmailsModule {}
