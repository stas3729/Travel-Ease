import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'shared/src/nats/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
})
export class UsersModule {}
