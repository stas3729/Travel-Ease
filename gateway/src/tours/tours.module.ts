import { Module } from '@nestjs/common';
import { NatsClientModule } from 'shared/src/nats/nats-client.module';
import { ToursController } from './tours.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {MyJwtModule} from "shared/src/jwt/jwt.module";

@Module({
  imports: [
    NatsClientModule,
    MyJwtModule,
  ],
  controllers: [ToursController],
})
export class ToursModule {}
