import { Module } from '@nestjs/common';
import { NatsClientModule } from 'common/src/nats/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
