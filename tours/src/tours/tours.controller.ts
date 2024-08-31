import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTourDto } from 'shared/src/dto/create-tour.dto';
import { ToursService } from './tours.service';

@Controller()
export class ToursMicroserviceController {
  constructor(private toursService: ToursService) {}
  @MessagePattern({ cmd: 'createTour' })
  async createTour(@Payload() createTourDto: CreateTourDto) {
    return this.toursService.createTour(createTourDto);
  }
}
