import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTourDto } from 'shared/src/dto/create-tour.dto';
import { lastValueFrom } from 'rxjs';

@UseGuards(JwtGuard)
@Controller('tours')
export class ToursController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createTour(@Body() createTourDto: CreateTourDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createTour' }, createTourDto),
    );
  }
}
