import { Module } from '@nestjs/common';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'shared/src/entities/user.entity';
import { NatsClientModule } from 'shared/src/nats/nats-client.module';
import { MyJwtModule } from 'shared/src/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NatsClientModule, MyJwtModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersService],
})
export class UsersModule {}
