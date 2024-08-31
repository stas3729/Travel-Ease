import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern({ cmd: 'signup' })
  async handleSignup(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

  @MessagePattern({ cmd: 'findUser' })
  async findUser(@Payload() email: string) {
    return await this.usersService.findByEmail(email);
  }
}
