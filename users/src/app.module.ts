import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
