import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyTypeormModule } from './typeorm/myTypeorm.module';
import * as Joi from 'joi';
import { ToursModule } from './tours/tours.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    MyTypeormModule,
    ToursModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
