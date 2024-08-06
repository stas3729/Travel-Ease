import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from 'common/src/database/database.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string(),
    }),
    envFilePath: './.env'
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
