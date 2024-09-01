import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTourDto } from 'shared/src/dto/create-tour.dto';
import { ToursService } from './tours.service';
import { User } from 'shared/src/entities/user.entity';
import { Tour } from 'shared/src/entities/tour.entity';

@Controller()
export class ToursMicroserviceController {
  constructor(private toursService: ToursService) {}
  @MessagePattern({ cmd: 'createTour' })
  async createTour(@Payload() createTourDto: CreateTourDto) {
    return this.toursService.createTour(createTourDto);
  }

  @MessagePattern({ cmd: 'findById' })
  async findByTitle(@Payload() id: string) {
    const parsedId = parseInt(id);
    return await this.toursService.findTourById(parsedId);
  }

  @MessagePattern({ cmd: 'allTours' })
  async allTours() {
    return await this.toursService.allTours();
  }

  @MessagePattern({ cmd: 'putUserInTheTour' })
  async putUserInTheTour(
    @Payload()
    {
      subscribeUserToTour,
      isTourExists,
    }: {
      subscribeUserToTour: User;
      isTourExists: Tour;
    },
  ) {
    isTourExists.subscribers = [];
    isTourExists.subscribers.push(subscribeUserToTour);
    return {
      msg: 'Success!',
    };
  }
}
