import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'signup' }, createUserDto),
    );
  }
}
