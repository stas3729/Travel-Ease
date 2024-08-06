import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
        'mongodb://root:password123@mongodb-primary:27017/',
    ),
  ],
})
export class DatabaseModule {}
