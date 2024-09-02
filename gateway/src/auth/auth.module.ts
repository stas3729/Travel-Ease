import { Module } from '@nestjs/common';
import { NatsClientModule } from 'shared/src/nats/nats-client.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {MyJwtModule} from "shared/src/jwt/jwt.module";

@Module({
  imports: [
    NatsClientModule,
    MyJwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
