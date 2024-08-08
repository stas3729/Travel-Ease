import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsClientModule } from 'common/src/nats/nats-client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    NatsClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
