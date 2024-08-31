import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'shared/src/entities/user.entity';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'test123',
            database: 'postgres',
            synchronize: true,
            entities: [User],
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
