import {Body, Controller, Inject, Post} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { lastValueFrom } from 'rxjs';
import {ApiBody, ApiCreatedResponse} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'signup' }, createUserDto),
    );
  }
}
