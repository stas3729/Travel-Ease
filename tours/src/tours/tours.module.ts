import { Module } from '@nestjs/common';
import { ToursMicroserviceController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'shared/src/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [ToursMicroserviceController],
  providers: [ToursService],
})
export class ToursModule {}
