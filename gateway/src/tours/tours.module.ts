import { Module } from '@nestjs/common';
import { NatsClientModule } from 'shared/src/nats/nats-client.module';
import { ToursController } from './tours.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NatsClientModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers: [ToursController],
})
export class ToursModule {}
