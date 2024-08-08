import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from 'common/src/dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @MessagePattern({ cmd: 'findUserByEMail'})
  async handleFindUserByEmail(@Payload() data: { email: string }) {
    return this.usersService.findOneByEmail(data.email);
  }
}
