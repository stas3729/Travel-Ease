import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTourDto } from '../dto/create-tour.dto';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { User } from 'shared/src/entities/user.entity';
import {ApiBearerAuth, ApiOkResponse, ApiParam} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('tours')
export class ToursController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @ApiOkResponse({ description: 'Create tour' })
  @Post()
  async createTour(@Body() createTourDto: CreateTourDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createTour' }, createTourDto),
    );
  }

  @ApiOkResponse({ description: 'Subscribe to the tour' })
  @ApiParam({
    name: 'tourId',
    required: true,
    description: 'Id of tour you want to subscribe',
  })
  @Post('subscribe/:id')
  async subscribeToTour(@Req() request: Request, @Param('id') id: string) {
    const isTourExists = await lastValueFrom(
      this.natsClient.send({ cmd: 'findById' }, id),
    );
    if (!isTourExists)
      throw new HttpException('Tour with such id does not exist', 409);

    const token = this.extractTokenFromCookies(request);
    const subscribeUserToTour: User = await lastValueFrom(
      this.natsClient.send(
        { cmd: 'subscribeUserToTour' },
        { isTourExists, token },
      ),
    );
    await lastValueFrom(
      this.natsClient.send(
        { cmd: 'putUserInTheTour' },
        { subscribeUserToTour, isTourExists },
      ),
    );
    return {
      msg: `You are successfully subscribed to <--${isTourExists.title}--> tour!>`,
    };
  }

  private extractTokenFromCookies(request: Request) {
    const token = request.headers.cookie.slice(6);
    return token;
  }

  @ApiOkResponse({ description: 'Get list of all tours' })
  @Get()
  all() {
    return this.natsClient.send({ cmd: 'allTours' }, {});
  }

  @ApiOkResponse({ description: 'Delete all tours' })
  @Delete()
  delete() {
    return this.natsClient.send({ cmd: 'deleteTours' }, {});
  }
}
