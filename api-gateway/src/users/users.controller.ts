import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from 'common/src/dto/create-user.dto';
import { AuthDto } from 'common/src/dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('signup')
  createUser(@Body() dto: CreateUserDto): Observable<any> {
    return this.natsClient.send({ cmd: 'create_user' }, dto);
  }

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.natsClient.send({ cmd: 'login'}, authDto);
  }
}
