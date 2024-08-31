import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tour } from 'shared/src/entities/tour.entity';
import { ConfigService } from '@nestjs/config';
import { User } from 'shared/src/entities/user.entity';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: parseInt(configService.get<string>('DB_PORT')),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            synchronize: true,
            entities: [Tour, User],
          });
          await dataSource.initialize();
          console.log('Database connected successfully.');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class MyTypeormModule {}
